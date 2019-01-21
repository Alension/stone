> stone 一个集成了小程序的cms博客系统

<p align="center">
<a href="#"><img alt="JDK" src="https://img.shields.io/badge/JDK-1.8-yellow.svg?style=flat-square"/></a>
</p>

------------------------------

## 简介

该系统的诞生的是为了想要写博客同时更新到微信小程序，当然后续会扩展更多功能。 
如果您只想搭建一个博客系统，那推荐您使用<a href="https://github.com/ruibaby/halo">halo</a>就能满足您的需求，该系统也是使用halo搭建。此外，该项目的小程序端是基于<a href="https://github.com/iamxjb/winxin-app-watch-life.net">守望轩</a>项目修改


## 快速上手
mini-program是该项目的小程序端，分别将java工程和mini-program导入java IDE和微信开发者工具

### 后端
安装完后将设置->博客设置进行设置 

* 其它设置
  * api服务启用(必须)
  * Api Token(推荐)
* 微信小程序设置
  * AppID(非必需，用于点赞评论功能)
  * AppSecret(非必需，用于点赞评论功能)

### 小程序端
修改mini-program中的utils下的config.js的配置项
* DOMAIN TOKEN(必须)
* TOKEN(推荐，填写后端设置的token)


## 小程序演示

![](https://github.com/Alension/stone/blob/master/mini-program/images/gh_140ab523e0a5_258%20(2).jpg)











