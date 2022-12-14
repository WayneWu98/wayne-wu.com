---
title: 我的写作流
date: 2022-11-25T18:20:35+08:00
category: Life
---

[[toc]]

我不是一个爱写博客的人，不管是技术类、生活类、或者其他的什么，一方面是自己不知道该写些什么，另一方面则是难以找到一个舒服的方式去写作。我使用了近5年的 WordPress，而当我意识到它没有将我有限的精力放在足够有价值的事情上时，我就几乎没有打开过自己的博客。

在近一年的时间里，我学习了很多东西，但知识的持续积累让我有时候“捡芝麻掉西瓜”，有时候甚至忘记有过那么一件事。另一种情况则是突然灵机闪现或者看到什么之后大彻大悟，但随着时间流逝也大概率被遗忘。有些东西确实存在着记录下来的必要。

在这种矛盾与动机之下，我开始推倒重来。

## 想法

WordPress 很好，但不是我想要的。不可否认，一开始入坑 WordPress 时，其强大的扩展能力和丰富的主题/插件生态令我佩服，但其过于华丽的衣裳，往往让我失去了最初的目的。Typecho 是一个比较小众的博客软件，特点是比较简洁，但比较难用。

> 如无必要，勿增实体！

从自身需求出发，我希望自己可以把精力放在“写”这件事情上，而不会为其它事情干扰分散精力，其中包括内容格式、资源文件整理等，于是 Markdown 自然成为了我的首选写作格式。同时，我不想花太多时间在站点维护上，不需要服务器的运维花销，也不需要后台管理花销。而从自身作为一名开发来说，我也要求它是高自由的，可扩展的。有很多软件满足了前半部分的要求，但不可扩展，更不自由。

静态网站是一个很古老的东西了，在前后端未分离的时代还要早才比较常见，但现在很流行使用前端技术开发静态网站，作为博客则被称为了静态博客，静态博客一般使用 Markdown 格式写文章，同时有很高的扩展能力。这一领域有很多优秀的产品，如：[Hexo](https://hexo.io)、[Hugo](https://gohugo.io)、[Gridiea](https://gridea.dev)等。但我并没有将它们纳入考虑范围内，一是它们功能过于完备（It is not bad thing, just too heavy for me）；二是因为技术洁癖，也许扩展它们很简单，但在涉及底层修改仍然像一个黑盒子。

于是我打算自己写一个，同时结合 CI/CD 完成全套自动化流程，将更多工作聚焦在写作身上。

## 实现

静态博客的实现有很多成熟的案例，这里主要借鉴了 [antfu.me](https://github.com/antfu/antfu.me) 的源码，使用 Vue 作为主框架，并利用 vite-plugin-vue-markdown 插件将 Markdown 文档转为 sfc，最后通过 vite-ssg 将项目代码生成为静态文件。

博客代码实现后，需要部署才可在互联网上进行访问，这里选择了 [Netlify](https://www.netlify.com/)，得益于其自动 CI/CD 的能力，我只需将改动推送到 Github，网站将自动进行更新。同类产品还有 [Vercel](https://vercel.com/)。

到这一步似乎已经完成了，其实没有。大陆境内访问部署于 Netlify 的项目，速度可以使用乌龟来形容，解决办法可以对项目进行 CDN加速，以此来提高访问速度。CDN接入有几处细节需要注意：

由于输出产物的 js/css 等文件的名称带有 hash 子串，每次部署可以保证客户端拿到最新的资源，CDN缓存和客户端缓存可以设置为一年，以此可以提高用户的二次访问速度；但由于 html 名称不会变动，因此不应该设置客户端缓存，但如果不设置 CDN缓存，每次用户访问，CDN都需要进行回源，对提升访问速度帮助不大，因此需要设置 CDN缓存，但需要另外一步工作，即在网站更新时手动去刷新缓存，这里可以利用 Netlify 构建成功的 Trigger 去实现自动化缓存刷新。

## 效果

外在，如今你所访问的网站即是最终效果。

内在，我的写作过程精简到只有两步：**write => add & commit & push**，同时它不依赖哪些固定的软硬件（除了 Git），因为它本质上只是在编辑 MD 文本，最后的上线也只是两句 Git 命令。在 Mac 端，结合 uPic，图片资源的引入也让整个写作过程变得行云流水。

> 博客实现上并未描述太多细节，包括评论系统，有感兴趣的可以参考[仓库源码](https://github.com/WayneWu98/wayne-wu.com)。

## 总结

整个项目开发没有花很多时间，因为博客开发本身并不是一件难事。博客的本质在于内容，内容的产出质量与数量才是博客的价值评判标准。这是我第一次将博客推倒重来，希望能坚持下去的同时，也能继续追求纯粹的事物，创造有价值的东西。