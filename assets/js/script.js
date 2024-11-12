let weakPasswords = [];

// Carrega a lista de senhas fracas ao carregar a página
fetch("data/weak-passwords.json")
  .then(response => response.json())
  .then(data => {
    weakPasswords = data;
  })
  .catch(error => console.error("Erro ao carregar a lista de senhas fracas:", error));

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const passwordError = document.getElementById("passwordError");
  passwordError.style.display = "none";  // Reseta a mensagem de erro
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const numberPattern = /[0-9]/;

  // Função para exibir a mensagem de erro temporariamente
  function showError(message) {
    passwordError.textContent = message;
    passwordError.style.display = "block";
    document.getElementById("password").value = "";
    setTimeout(() => {
      passwordError.style.display = "none";
    }, 10000); // 10 segundos
  }

  // Verifica se a senha é fraca
  if (weakPasswords.includes(password)) {
    showError("A senha escolhida é muito comum. Por favor, escolha uma senha mais forte.");
    return;
  }

  // Outras validações de senha
  if (password.length !== 8) {
    showError("A senha deve ter exatamente 8 caracteres.");
    return;
  }
  
  if (!specialCharPattern.test(password)) {
    showError("A senha deve conter pelo menos um caractere especial.");
    return;
  }

  if (!numberPattern.test(password)) {
    showError("A senha deve conter pelo menos um número.");
    return;
  }

  // Sucesso
  alert("Login realizado com sucesso!");
  document.getElementById("loginForm").reset();
});