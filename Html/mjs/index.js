$(function () {
    // $.ADDLOAD();
    new Vue({
        el: '#main',
        data: {
            proinfo: []
        },
        ready: function () {
            var _this = this;
            _this.searchlink();
            // _this.proinfoajax();
            _this.$nextTick(function () {
            })
        },
        methods: {
            searchlink: function () {
                $('.index-search').on('click', function () {
                    $('.search-box').show(100, function () {
                        setTimeout(function () {
                            $('#search_alert').trigger('focus')
                        }, 2000)
                    });


                })
                $('.search-box .close').on('click', function () {
                    $('.search-box').hide();
                })
                $('#index').on('click', '.search-box .btn', function () {
                    var val = $('.search-box .text').val()
                    if (val == '') {
                        console.log(312)
                        $.oppo('请输入关键字', 1)
                    } else {
                        window.location.href = "/Html/searchlist.html?key=" + encodeURIComponent(encodeURIComponent(val))
                    }
                })
                $('#index').on('click', '.search-box .con li',function () {
                    var val = $(this).attr('data-tag')
                    window.location.href = "/Html/searchlist.html?key=" + encodeURIComponent(encodeURIComponent(val))
                })
                $('.search-box .text').on('keyup', function () {
                    if ($(this).val() == '') {
                        $('.search-box .delete').hide();
                    } else {
                        $('.search-box .delete').show();
                    }
                })
                $('.search-box .delete').on('click', function () {
                    $('.search-box .text').val('');
                    $(this).hide();
                })
            },
            //首页产品
            proinfoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Mall/Home',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.proinfo = rs.data;
                        _this.$nextTick(function(){
                            $.RMLOAD();
                        })

                    }
                })
            }
        }
    })
})