/** @format */

async function PrgramDetails() {
  var ProgramId = localStorage.getItem("ProgramId");
  let url = `https://localhost:44313/api/Program/GetProgramById/${ProgramId}`;
  let request = await fetch(url);
  let data = await request.json();

  var orderContainer = document.getElementById("orderContainer");

  orderContainer.innerHTML = `
                    <tbody>
                        <tr class="cart_item">
                          <th>Program Name</th>
                          <td class="product-name" id="programName">
                            ${data.name}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr class="cart-subtotal">
                          <th>Discount</th>
                          <td><span class="amount">$00</span></td>
                        </tr>
                       
                        <tr class="order-total">
                          <th>Order Total</th>
                          <td>
                            <strong><span>$</span><span id="totalAmount" class="amount">${data.price}</span></strong>
                        </td>
                      </tr>
                    </tfoot>
  `;
}

PrgramDetails();

//////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetBillingDetails() {
  var UserId = localStorage.getItem("UserId");
  let url = `https://localhost:44313/api/Payment/GetBillingDetails/${UserId}`;
  let request = await fetch(url);
  let data = await request.json();

  document.getElementById("FirstName").value = data.firstName || "";
  document.getElementById("LastName").value = data.lastName || "";
  document.getElementById("Address").value = data.address || "";
  document.getElementById("City").value = data.city || "";
  document.getElementById("County").value = data.county || "";
  document.getElementById("Postcode").value = data.postcode || "";
}

GetBillingDetails();

//////////////////////////////////////////////////////////////////////////////////////////////////////

async function AddBllingDetails() {
  event.preventDefault();
  var UserId = localStorage.getItem("UserId");

  const url = `https://localhost:44313/api/Payment/AddBllingDetails/${UserId}`;
  var form = document.getElementById("billingForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    processStripePayment();
  } else {
    Swal.fire({
      icon: "error",
      title: "Sorry!",
      text: "You are already enrolled in program. Please check your my program section for access to your program materials!",
    });
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

var stripe = Stripe(
  "pk_test_51Q3FzBRqxwpgnuaXO3FvwmrXdMIzL7hn70SO4lHu8W7QBGqWYWIWGzCYGMHtPw3j16Vfv1nRtyhsgK2LazOZGphL00A7laiJOh"
);

async function processStripePayment() {
  var totalAmount =
    Number(document.getElementById("totalAmount").innerText) || 0;
  var ProgramId = localStorage.getItem("ProgramId");
  var programName = document.getElementById("programName").innerText;
  var UserId = localStorage.getItem("UserId");

  fetch("https://localhost:44313/api/Payment/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: totalAmount * 100,
      productName: programName,
      successUrl:
        window.location.origin +
        `/User/ThankYou.html?amount=${totalAmount}&programId=${ProgramId}&userId=${UserId}`,
      cancelUrl: window.location.origin + "/User/404.html",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((session) => {
      if (session.sessionId) {
        stripe
          .redirectToCheckout({ sessionId: session.sessionId })
          .then((result) => {
            if (result.ok) {
              alert("payment sucssefuly");
            }
            if (result.error) {
              Swal.fire("Error", result.error.message, "error");
            }
          });
      } else {
        throw new Error("Session ID not found in the response");
      }
    })
    .catch((error) => {
      console.error("Error initiating Stripe payment:", error);
      Swal.fire("Error", "Failed to initiate payment.", "error");
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetPaymentInfo() {
  var UserId = localStorage.getItem("UserId");
  let url = `https://localhost:44313/api/Payment/GetPaymentInfo/${UserId}`;
  let request = await fetch(url);
  let data = await request.json();

  var studentOrderContainer = document.getElementById("studentOrderContainer");

  var n = 1;
  data.forEach((details) => {
    studentOrderContainer.innerHTML += `
    
      <tr>
        <td>${n}</td>
        <td><img src="/Images/${
          details.program.image
        }" width="90" height="90"></td>
        <td>${details.program.name}</td>
        <td>$${details.amount}</td>
        <td>${details.paymentDate.split("T")[0]}</td>
        <td><button onclick = "GetInvoise(${
          details.paymentId
        })" >Downlod</button></td>
      </tr>
    `;
    n++;
  });
}

GetPaymentInfo();

async function GetInvoise(pymentId) {
  let url = `https://localhost:44313/api/Payment/GenerateInvoice/${pymentId}`;

  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice_${pymentId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
