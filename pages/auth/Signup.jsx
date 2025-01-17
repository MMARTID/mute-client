function Signup() {
  return (
    <>
      <div>
        <h1>Formulario de Registro</h1>

        <form>
          <label>Correo Electronico:</label>
          <input type="email" name="email" />

          <br />

          <label>Username:</label>
          <input type="text" name="username" />

          <br />

          <label>Contraseña:</label>
          <input type="password" name="password" />

          <br />

          <button type="submit">Registrar</button>
        </form>
      </div>
    </>
  );
}
export default Signup;
