$(function () {
    // $.checkuser();
    new Vue({
        el: '#box',
        data: {
            btn:false,
            a:1,
            layer:false
        },
        methods: {
            hyclick:function (event) {
                var _this=this;
                if(_this.a==1){
                    _this.btn=true;
                    _this.a=2;
                    $('.jn-hy-che').prop("checked","checked");
                }else{
                    _this.btn=false;
                    _this.a=1;
                    $('.jn-hy-che').removeProp("checked");
                }
            },
            ajax: function () {
                // $.ajax({
                //     url: '/Api/v1/Member/' +$.get_user('Id') +'/Update',
                //     dataType:'json',
                //     type: 'put',
                //     data: {
                //         NickName: '',
                //         Birthday: $('.date').val(),
                //         Sex: '',
                //         TastesType: ''
                //     }
                // }).done(function (rs) {
                //     if (rs.returnCode == '200') {
                //         $.oppo('修改成功', 1, function () {
                //             window.location.replace("/Html/html/personalcenter/myinfo.html");
                //         })
                //     }
                // })
            },
            submit:function () {
                var _this=this;
                //手机号验证匹配
                var reg = /^1[3|4|5|7|8]\d{9}$/
                if($('.jn-xx-name-in').val()==''){
                    $.oppo('请输入姓名',1);
                    return false;
                }else if($('.jn-xx-tel-in').val()==''){
                    $.oppo('请输入手机号',1);
                    return false;
                }else if (!reg.test($('.jn-xx-tel-in').val())) {
                    $.oppo("手机号格式有误", 1);
                    return false;
                } else if($('.jn-xx-chad-in').val()==''){
                    $.oppo('请输入差点',1);
                    return false;
                }else{
                    _this.submitajax();
                }
            },
            submitajax:function () {
                var _this=this;
                _this.layer=true;
            }

        }
    })
})