import React from 'react'

const Login = () => {
  return (
    <form className="card auth-card">
      <div className="card-content">
        <span className="card-title">Домашняя бухгалтерия</span>
        <div className="input-field">
          <input id="email" type="text" className="validate" />
          <label htmlFor="email">Email</label>
          <small className="helper-text invalid">Email</small>
        </div>
        <div className="input-field">
          <input id="password" type="password" className="validate" />
          <label htmlFor="password">Пароль</label>
          <small className="helper-text invalid">Password</small>
        </div>
      </div>
      <div className="card-action">
        <div>
          <button
            className="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i className="material-icons right">send</i>
          </button>
        </div>

        <p className="center">
          Нет аккаунта?
          <a href="/">Зарегистрироваться</a>
        </p>
      </div>
    </form>
  )
}

export default Login
