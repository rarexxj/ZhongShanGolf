$(function () {
    $.ADDLOAD();
    $.checkuser();
    new Vue({
        el: '#main',
        data: {
            info: [],
            data: {
                pageNo: 1,
                limit: 10
            },
            allpage: ''
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.$nextTick(function () {
                _this.upload();
                _this.linkaddress();
            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Activity',
                    dataType: 'json',
                    type: 'get',
                    data: _this.data
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        _this.allpage = (rs.data.TotalCount) / (_this.data.limit);
                        $.RMLOAD()
                    }
                })
            },
            upload: function () {
                var flag = true;
                var _this = this;
                $(window).scroll(function () {
                    var H = $('.scroll')[0].getBoundingClientRect().top;
                    var h = $(window).height();
                    if (H - h < 0 && flag == true) {
                        flag = false;
                        _this.data.pageNo++;

                        if (_this.data.pageNo > Math.ceil(_this.allpage)) {
                            $.RMLOAD();
                        } else {
                            setTimeout(function () {
                                flag = true;
                            }, 500)
                            _this.infoajax();
                            $.ADDLOAD();
                        }
                    }
                })
            },
            linkaddress:function () {
                //冒泡
                $("#main").on("click",'.ac-link', function (e) {
                    var evt = e || window.event;
//              evt.stopPropagation();
                    if($(evt.target).is('.pro-join')){
                        evt.preventDefault();
                        evt.cancelBubble = true;
                    }
                })
            }

        }
    })
})