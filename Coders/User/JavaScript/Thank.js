/** @format */

async function AddPaymentInfoAndAddStudent() {
  const urlParams = new URLSearchParams(window.location.search);
  const Amount = urlParams.get("amount");
  const UserId = urlParams.get("userId");
  const ProgramId = urlParams.get("programId");

  fetch("https://localhost:44313/api/Payment/AddPaymentInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: Amount,
      userId: UserId,
      programId: ProgramId,
    }),
  });

  fetch("https://localhost:44313/api/Payment/AddStudent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: UserId,
      programId: ProgramId,
    }),
  });
}

AddPaymentInfoAndAddStudent();

///////////////////////////////////////////////////////////////////////////////////////////////////
