<template>
<div>
  <div class="page" :class="{'show-pannel': isShowMenu}">
    <div class="pannel" >
      <ul class="nav-list">
        <li>Mein Konto1</li>
        <li>Mein Konto2</li>
        <li>Mein Konto3</li>
        <li>Mein Konto4</li>
        <li>Mein Konto5</li>
      </ul>
    </div>
    <div class="header">
      <div class="header-inner">
        <p @click="isShowMenu = !isShowMenu">
          menu
        </p>
        <p>
          car
        </p>
      </div>
    </div>
    <div class="main">
      <div class="banner">
        banner
      </div>
      <h2>特卖 / 新 / 免费送货</h2>
      <ul class="product-list">
        <li>
          <div class="product-list-inner">
            <p class="product-list-image"></p>
            <p class="product-list-title">A字型V领落地长袖雪纺婚纱......</p>
            <p class="product-list-price">€101.20</p>
          </div>
        </li>
        <li>
          <div class="product-list-inner">
            <p class="product-list-image"></p>
            <p class="product-list-title">A字型V领落地长袖雪纺婚纱......</p>
            <p class="product-list-price">€101.20</p>
          </div>
        </li>
        <li>
          <div class="product-list-inner">
            <p class="product-list-image"></p>
            <p class="product-list-title">A字型V领落地长袖雪纺婚纱......</p>
            <p class="product-list-price">€101.20</p>
          </div>
        </li>
        <li>
          <div class="product-list-inner">
            <p class="product-list-image"></p>
            <p class="product-list-title">A字型V领落地长袖雪纺婚纱......</p>
            <p class="product-list-price">€101.20</p>
          </div>
        </li>
        <li>
          <div class="product-list-inner">
            <p class="product-list-image"></p>
            <p class="product-list-title">A字型V领落地长袖雪纺婚纱......</p>
            <p class="product-list-price">€101.20</p>
          </div>
        </li>
        <li>
          <div class="product-list-inner">
            <p class="product-list-image"></p>
            <p class="product-list-title">A字型V领落地长袖雪纺婚纱......</p>
            <p class="product-list-price">€101.20</p>
          </div>
        </li>
        <li>
          <div class="product-list-inner">
            <p class="product-list-image"></p>
            <p class="product-list-title">A字型V领落地长袖雪纺婚纱......</p>
            <p class="product-list-price">€101.20</p>
          </div>
        </li>
        <li>
          <div class="product-list-inner">
            <p class="product-list-image"></p>
            <p class="product-list-title">A字型V领落地长袖雪纺婚纱......</p>
            <p class="product-list-price">€101.20</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      isShowMenu: false
    }
  },
  mounted() {

  }
}
</script>

<style scope>
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}
ul{
  list-style: none;
}

.page {
  width:100%;
  overflow: hidden;
}

.pannel {
  position: fixed;
  z-index: 6;
  width: 80%;
  height: 100%;
  left: -80%;
  top:0;
  background: #d00111;
  color: #fff;
  font-size: 14px;
  line-height: 3em;
  transition: left .2s ease;
}

.nav-list li {
  border-bottom: solid 1px #fff;
  padding-left: 20px;
}

.header {
  position: fixed;
  z-index: 9;
  width: 100%;
  left:0;
  top:0;
  transition: left .2s ease;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.65);
  .header-inner{
    line-height: 3em;
    padding: 0 2em;
    display: flex;
    justify-content: space-between;
    background: #e40214;
    color:#fff;
  }
}

.main{
  transition: left .2s ease;
}

.banner{
  height:150px;
  background:#e1e1e1;
}

.show-pannel{
  .pannel{
    left: 0;
  }
  .header {
    left: 80%;
  }
  .main{
    position: fixed;
    z-index: 6;
    width: 100%;
    left:80%;
    top:0;
  }
}

.product-list{
  overflow: hidden;
  li{
    width:40%;
    margin:20px auto 0 5%;
    border:solid 1px #ccc;
    box-sizing: border-box;
    float: left;
    .product-list-inner{

    }
    .product-list-image{
      height:100px;
      background: orange;
    }
  }
}
</style>
