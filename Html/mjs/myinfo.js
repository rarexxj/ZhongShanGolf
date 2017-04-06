$(function () {
    // $.ADDLOAD();
    $.checkuser();
    var id = $.getUrlParam('id');
    var sex;
    new Vue({
        el: '#myinfo',
        data: {
            info: [],
            btn: true,
            imgid: '',
            vipid: ''
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.$nextTick(function () {
                _this.Portrait();
                _this.exit();
                _this.hideexit();
            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/MyMember',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        _this.vipid = rs.data.Id;
                        $.RMLOAD()

                    }
                })
            },
            // 上传头像
            Portrait: function () {
                var _this = this;
                //			图片上传
                $(".file").on("change", function () {
                    $.ajax({
                        url: $("#img_data").attr('action'),
                        dataType: "json",
                        type: "POST",
                        data: new FormData($('#img_data')[0]),
                        processData: false,
                        cache: false,
                        contentType: false,
                        success: function (rs) {
                            if (rs.returnCode == '200') {
                                _this.imgid = rs.data[0].Id;
                                var src = rs.data[0].RelativePath;
                                $('.head img').attr('src', src);
                                _this.fiximg();

                            } else {

                                $.oppo(rs.msg);
                            }
                            console.log(rs)

                        },
                        error: function (xh, yh, error) {
                            $.oppo(error);
                        }
                    });

                })

            },
            //修改头像
            fiximg: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Member/' + _this.vipid + '/Avatar',
                    type: 'PATCH',
                    data: {
                        avatarId: _this.imgid
                    }
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                    }
                })
            },
            //退出
            exit: function () {
                var _this = this;
                $('.submit').on('click', function () {
                    _this.exitajax();
                })

            },
            exitajax: function () {
                $.ajax({
                    url: '/Api/v1/Logout',
                    type: 'post'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        localStorage.removeItem('qy_user');
                        localStorage.removeItem('qy_loginToken');
                        window.location.href = "/Html/html/personalcenter/login.html"
                    }
                })
            },
            hideexit: function () {
                if ($.is_weixin()) {
                    $('.submit').hide();
                }
            }
        }
    })
})