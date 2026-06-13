<template>
  <div class="blog">
    <div class="container">
      <span class="me-title" style="display:inline-block;">关于我👀</span>
      <p class="about-me">
        hi👋我是ariechovi（随便想💭的称呼，在网上不用本名，所以给自己起了一个代号），目前大二，就读于湖南某双非的信息安全专业，enfp人格，平常就写点代码和手账。
        <br/>
        最大的爱好就是<strong>听说唱🎵</strong>，什么风格都可以，但最喜欢杨和苏KeyNG，还有一些比如：capper、rapeter、sasi、加木，程思源……
        <br/>
        其实主要还是看歌🤔（虽然asen和杨和苏有beef但依旧不妨碍我很喜欢听asen的day1），此外我也会自己找beat写rap，那我的水平
        就是一个爱好者的水平，所以呢我的博客主题就是“This Blog.This Beat.This Me”
      </p>

      <span class="title" style="display:inline-block;">关于本站✨</span>
      <p class="about-website">
        毋庸置疑，这个网站目前就是我的个人博客，大部分内容是由本人独立完成🥰。
      </p>
      <br/>
      <span class="title" style="font-size:24px;">⁉️为什么建站</span>
      <p class="about-website">
        起因是无意中发现了一个博主写的博客网站超级精致，于是我也想拥有一个属于自己的个人网站。
        <br/>
        当然，一句“想拥有”还不足以说服我，为了少关注多余信息、降低分享欲和减少社交，本学期关闭了微信的朋友圈并且降低与朋友的聊天频次，
        但是对于本e人来说，有时候难免需要写一些自己的生活感受以及记录生活🧩，毕竟人对时间毫无还手之力，
        如果怀念以前的自己了，还可以看看博客记录。
        <br/>
        不仅如此，更主要的还是为了提高能力和技术，有了博客后会反向督促自己复盘每次的学习路线和过程，
        并且做一个回顾记录，知识输入完的输出能帮助自己更快掌握学的东西啦！
        <br/>
      </p>

      <span class="title" style="font-size:24px;">🚧网站进度</span>
      <p class="about-website">
        后续会慢慢完善博客内容所需的基础功能🚨，并且添加一些前端的设计，但是进度应该不快，重心会放在博客内容的呈现以及其他的事情哈。
      </p>

      <div class="cite">
        “ 目前的网站只是一个初步上线版本，但是已经是我这些天能做到的最好的呈现🎊了，其中不是说代码难写，而是目前我的技术水平不足以支撑我想要的网站设计，再者说，就算实现了也让我觉得不美观，只能pass，这样一来二去，中间就花了很多的时间和精力在设计上，所以前端的设计实现是让我最为难🥹的地方,另外为了尽快上线，还有一些后端功能没有实现，例如评论留言，登录注册，文章标签等等 ”
      </div>


    </div>
  </div>
</template>
<style scoped>
.blog {
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: block;
  padding-top: 80px;
}
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 0 40px 50px;
  border-radius: 20px;
}
.me-title{
  font-size: 32px;
  font-weight: bold;
  font-family:"Source Han Serif SC", serif;
  padding:2px 4px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.title{
  font-size: 32px;
  font-weight: bold;
  font-family:"Source Han Serif SC", serif;
  padding:2px 4px;
  margin-bottom: 10px;
  margin-top: 5px;

}
.about-me{
  font-size:18px;
  font-family: "Source Han Serif SC", serif;
  line-height: 1.8;
}
.about-website{
  font-size:18px;
  font-family: "Source Han Serif SC", serif;
  line-height: 1.8;
}
.cite{
  font-size:16px;
  font-family: "Source Han Serif SC", serif;
  line-height: 1.8;
  color:#888888;
  border-left: 8px solid #888888;
  border-right: 1px solid rgba(98, 94, 94, 0.89);
  border-bottom: 1px solid rgba(98, 94, 94, 0.89);
  padding:2px 4px;
  margin-top: 5px;
}
@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 10px;
  }
}

</style>


<script setup lang="ts">
import { gsap } from 'gsap';
import {onMounted} from 'vue';


onMounted(() => {
  gsap.to(".me-title", {
    duration: 1.5,
    x: 20,
    rotation: 360,
    ease: "power2.out",
    rotateX:360,
    color: "#f5389c"
  });
});
</script>
