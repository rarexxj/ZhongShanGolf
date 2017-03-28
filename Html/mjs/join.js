$(function () {
    $.checkuser();
    var id = $.getUrlParam('id');
    new Vue({
        el: '#box',
        data: {
            btn: false,
            a: 1,
            layer: false
        },
        methods: {
            hyclick: function (event) {
                var _this = this;
                if (_this.a == 1) {
                    _this.btn = true;
                    _this.a = 2;
                    $('.jn-hy-che').prop("checked", "checked");
                } else {
                    _this.btn = false;
                    _this.a = 1;
                    $('.jn-hy-che').removeProp("checked");
                }
            },
            submit: function () {
                var _this = this;
                //手机号验证匹配
                var reg = /^1[3|4|5|7|8]\d{9}$/
                if ($('.jn-xx-name-in').val() == '') {
                    $.oppo('请输入姓名', 1);
                    return false;
                } else if ($('.jn-xx-tel-in').val() == '') {
                    $.oppo('请输入手机号', 1);
                    return false;
                } else if (!reg.test($('.jn-xx-tel-in').val())) {
                    $.oppo("手机号格式有误", 1);
                    return false;
                } else if ($('.jn-xx-chad-in').val() == '') {
                    $.oppo('请输入差点', 1);
                    return false;
                } else {
                    _this.submitajax();
                }
            },
            submitajax: function () {
                var _this = this;
                _this.layer = true;
                $.ajax({
                    url: '/Api/v1/Activity/' + id + '/Apply',
                    dataType: 'json',
                    type: 'post',
                    data: {
                        activityId: id,
                        RealName: $('.jn-xx-name-in').val(),
                        PhoneNumber: $('.jn-xx-tel-in').val(),
                        Almost: $('.jn-xx-chad-in').val(),
                        MemberCard: $('.vip-car-num').val(),
                        GuestOne: $('.jn-xx-jb1').val(),
                        GuestTwo: $('.jn-xx-jb2').val(),
                        GuestThree: $('.jn-xx-jb3').val()
                    }
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        
                    }
                })
            },
            ok:function () {
                window.location.href=''
            }
        }
    })
})