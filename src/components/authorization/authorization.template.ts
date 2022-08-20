import './authorization.style.scss';

export const AUTHORIZATION_TEMPLATE = `<div class="container">
<div class="auth-wrapper">
  <ul class="links-btn">
    <li class="links-btn__signIn active-link">Вход</li>  
    <li class="links-btn__signUp">Регистрация</li>      
  </ul>
  <div class="signIn-container">
    <div class="form-title">Войдите и начните улучшать свой английский прямо сейчас</div>
    <form class="form-signIn" action="" method="post" name="form">
          <input class="form-styling" type="text" name="username" autocomplete="off" placeholder="email"/>
          <input class="form-styling" type="text" name="password" placeholder="password"/>
          <button type="submit" class="btn-submit submit-signIn">Войти</button></p>
    </form>
  </div>
</div>
</div>`;
