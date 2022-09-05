import './authorization.style.scss';

export const AUTHORIZATION_TEMPLATE = `<div class="container auth-container">
<div class="auth-wrapper">
  <ul class="links-btn">
    <li class="links-btn__signIn active-link">Вход</li>  
    <li class="links-btn__signUp">Регистрация</li>      
  </ul>
  <div class="signs-container">
  <div class="signIn-container">
    <div class="form-title">Войдите и начните улучшать свой английский прямо сейчас</div>
    <form class="form form-signIn" action="" method="post" name="form">
          <input class="form-styling email-signIn" type="email" name="username" autocomplete="off" placeholder="email" required/>
          <input class="form-styling password-signIn" type="password" name="password" placeholder="password" minlength="8" required/>
          <button type="submit" class="submit-signIn">Войти</button></p>
    </form>
  </div>
  <div class="signUp-container">
    <div class="form-title">Присоединяйся к сообществу</div>
    <form class="form form-signUp" action="" method="post" name="form">
          <input class="form-styling name-signUp" type="text" name="username" autocomplete="off" placeholder="Name" required/>
          <input class="form-styling email-signUp" type="email" name="username" autocomplete="off" placeholder="email" required/>
          <input class="form-styling password-signUp" type="password" name="password" placeholder="password" minlength="8" required/>
          <button type="submit" class="submit-signUp">Регистрация</button></p>
    </form>
  </div>
  </div>
</div>
</div>`;
