var yeoman = require('yeoman-generator');
var chalk = require('chalk');//不同的颜色信息
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');
var del = require('del');
var string = require("underscore.string");
var Util = require("../common");

var getPrompts = function(){
  var prompts = [{
      type: 'input',
      name: 'name',
      message: 'name of app:', 
      default: this.name
    },
    {
      type: 'input',
      name: 'description',
      message: 'description:', 
      default: this.description
    },
    {
      type: 'input',
      name: 'repo',
      message: 'git repository:', 
      default: this.repo
    },
    {
      type: 'input',
      name: 'license',
      message: 'license:', 
      default: this.license
    },
    {
      type: 'input',
      name: 'author',
      message: 'author:', 
      default: this.author
    }
  ];
  return prompts;
}

var promptHanlder = function(props){
  this.name = props.name;
  this.pkgName = props.name;
  
  this.repo = props.repo;
  this.license = props.license;
  this.author = props.author;
  this.description = props.description;

  //进入下一个生命周期阶段调用
  this.done();
}

var Config = {
  // //初始化准备工作
  initializing:function(){
    var src = path.join(process.cwd(),'*');
    del([src],{force:true});
  },
  // 接受用户输入
  prompting: function () {
    this.done = this.async();
    this.name = path.basename(process.cwd());
    this.license = '';
    this.description = '';
    this.author = '';

    this.prompt(getPrompts.bind(this)(),promptHanlder.bind(this));
  },
  writing:{
    app: function (){
      Util.copy(this,Util.getTemplate(__dirname+"/templates"));
    }
  },
  install:function (){
    this.done = this.async();
    var _self = this;

    Util.execCommand(this,["npm install"]);
  },
  end:function (){
    var done = this.async();
    Util.execCommand(this,["npm run dev"]);
  }
};

module.exports = yeoman.Base.extend(Config);