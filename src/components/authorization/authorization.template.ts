import './authorization.style.scss';

export const AUTHORIZATION_TEMPLATE = `<div class="container">
<div class="auth-wrapper">
  <ul class="links-btn">
    <li class="links-btn__signIn active-link">Вход</li>  
    <li class="links-btn__signUp">Регистрация</li>      
  </ul>
  <div class="signs-container">
  <div class="signIn-container">
    <div class="form-title">Войдите и начните улучшать свой английский прямо сейчас</div>
    <form class="form form-signIn" action="" method="post" name="form">
          <input class="form-styling" type="email" name="username" autocomplete="off" placeholder="email"/>
          <input class="form-styling" type="password" name="password" placeholder="password"/>
          <button type="submit" class="submit-signIn">Войти</button></p>
    </form>
  </div>
  <div class="signUp-container">
    <div class="form-title">Присоединяйся к сообществу</div>
    <form class="form form-signUp" action="" method="post" name="form">
          <input class="form-styling" type="text" name="username" autocomplete="off" placeholder="Name"/>
          <input class="form-styling" type="email" name="username" autocomplete="off" placeholder="email"/>
          <input class="form-styling" type="password" name="password" placeholder="password"/>
          <button type="submit" class="submit-signUp">Регистрация</button></p>
    </form>
  </div>
  </div>
</div>
</div>`;
