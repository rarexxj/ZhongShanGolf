$(function () {
    $.ADDLOAD();
    new Vue({
        el: '#main',
        data: {
            proinfo: [],
            TotalCount:[],
            infodata: {
                wordKey: '',
                goodsCategory: 3,
                pageNo: 1,
                limit: 10
            },
            allpage: ''

        },
        ready: function () {
            var _this = this;
            _this.searchlink();
            _this.proinfoajax();
            _this.scrollload();
            _this.$nextTick(function () {
            })
        },
        methods: {
            searchlink: function () {
                var _this=this;
                $('.index-search').on('click', function () {
                    // $('.search-box').show(100, function () {
                    //     // setTimeout(function () {
                    //     //     $('#search_alert').trigger('focus')
                    //     // }, 2000)
                    // });


                })
                // $('.search-box .close').on('click', function () {
                //     $('.search-box').hide();
                // })
                $('#main').on('click', '.index-searchbox-name', function () {
                    var val = $('#search').val();
                    if (val == '') {
                        $.oppo('请输入关键字', 1)
                    } else {
                        $.ADDLOAD();
                        _this.infodata.wordKey=$.trim($('#search').val());
                        _this.infodata.pageNo=1;
                        _this.proinfoajax();
                        // $('.text').val('');
                        $('.search-box').hide();
                        // window.location.href = "/Html/html/buy/searchlist.html?key=" + encodeURIComponent(encodeURIComponent(val))
                    }
                })
                // $('#main').on('click', '.search-box .con li', function () {
                //     var val = $(this).attr('data-tag')
                //     window.location.href = "/Html/searchlist.html?key=" + encodeURIComponent(encodeURIComponent(val))
                // })
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
            proinfoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Mall/Goods/List',
                    type: 'get',
                    dataType: 'json',
                    data: _this.infodata
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.TotalCount=rs.data.TotalCount;
                        if(_this.infodata.pageNo==1){
                            _this.proinfo=rs.data.Goods;
                        }else{
                            _this.proinfo =_this.proinfo.concat(rs.data.Goods);
                        }
                        _this.allpage = rs.data.TotalCount / _this.infodata.limit;
                        _this.$nextTick(function () {
                            $.RMLOAD();
                        })

                    }
                })
            },
            scrollload: function () {
                var flag = true;
                var _this = this;
                $('.scrollbox').scroll(function () {
                    var H = $('.scroll')[0].getBoundingClientRect().top;
                    var h = $(window).height();
                    if (H - h < 0 && flag == true) {
                        flag = false;
                        _this.infodata.pageNo++;

                        if (_this.infodata.pageNo > Math.ceil(_this.allpage)) {
                            $.RMLOAD();
                        } else {
                            setTimeout(function () {
                                flag = true;
                            }, 500)
                            _this.proinfoajax();
                            $.ADDLOAD();
                        }
                    }
                })
            }
        }
    })
})