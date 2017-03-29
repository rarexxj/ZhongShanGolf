$(function () {
    $.ADDLOAD()
    $.checkuser();
    var gid = $.getUrlParam('gid'); //单品id和数量
    var addid = $.getUrlParam('addid');
    if (gid) {
        var gid2 = gid.split('|')[0]; //单品id
    }
    var ids = {};
    if (gid) {
        ids.SingleGoods = [];
        var a = {}
        a.SingleGoodsId = gid.split('|')[0];
        a.Quantity = gid.split('|')[1];
        ids.SingleGoods.push(a)
    }
    if (addid) {
        ids.AddressId = addid
    }
    console.log(ids);
    new Vue({
        el: '#main',
        data: {
            info: [],
            data1: ids
        },
        ready: function () {
            var _this = this;
            _this.ajax();
            _this.$nextTick(function () {
                _this.link();
                _this.js();
                _this.prosubmit();
                _this.getsettime();
                // $.RMLOAD();
            })
        },
        methods: {
            ajax: function () {
                var _this = this;
                console.log(_this.data1)
                $.ajax({
                    url: "/Api/v1/Mall/OrderCalculation",
                    data: _this.data1,
                    type: 'post'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        _this.price();
                        //计算总价
                        rs.data.allprice = parseFloat(rs.data.GoodsAmount + rs.data.ShippingFee)
                        $.RMLOAD();


                    }
                })
            },
            link: function () {
                //选择地址
                $('#main').on('click', '.choadd .a', function () {
                    window.location.href = "/Html/html/shopcar/chooseaddress.html?gid=" + gid
                })

            },
            //价格计算
            price: function () {
                var _this = this;
                $('.need').html((_this.info.GoodsAmount) - (_this.info.GoodsDeposit));
            },
            //提交订单
            prosubmit: function () {
                var _this = this;
                console.log($('#peistime').val())
                $('.balance').on('click', function () {
                    if ($('.addadd').length) {
                        $.oppo('请选择收货地址', 1);
                    } else {
                        var prodata = []
                        for (var i = 0; i < _this.info.Goods.List.length; i++) {
                            var pro = {}
                            pro.Id = _this.info.Goods.List[i].SingleGoodsId;
                            pro.Quantity = _this.info.Goods.List[i].Quantity;
                            prodata.push(pro)
                        }
                        var num = 0
                        if ($('.weui_switch').is(':checked')) {
                            num = $('.weui_switch').attr('data-int')
                        } else {
                            num = 0
                        }
                        var message = {
                            Consignee: _this.info.Addresses.Contacts,
                            Province: _this.info.Addresses.Province,
                            City: _this.info.Addresses.City,
                            District: _this.info.Addresses.District,
                            Street: _this.info.Addresses.Street,
                            Address: _this.info.Addresses.Address,
                            Tel: _this.info.Addresses.Phone,
                            Memo: $('.bz').val(),
                            Goods: prodata,
                            CouponId: $('.youhq.active').attr('data-id') ? $('.youhq.active').attr('data-id') : null,
                            GoodId: jjid,
                            BestTime: $('.peit').val(),
                            OptionalGoodsId: a
                        }
                        console.log(message)
                        _this.inputajax(message);
                    }
                })
            },
            inputajax: function (message) {
                $.ajax({
                    url: '/Api/v1/Mall/OrderSubmit',
                    data: message,
                    type: 'post'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        if ($('.car-list .amo').attr('data-price') == 0) {
                            window.location.replace("/Html/Member/PersonalCenter.html")
                        } else {
                            window.location.replace("/Html/html/shopcar/pay.html?id=" + rs.data.Id + '&OrderNo=' + rs.data.OrderNo + '&money=' + $('.car-list').find('.amo').attr('data-price') + '&time=' + rs.data.CreateTime + '&yhq=' + $('#yhq').attr('data-price'))
                        }
                    }
                })
            },
            js: function () {
                var _this = this;
                var n = $('.weui_switch').attr('data-money')
                if ($('.weui_switch').is(':checked')) {
                    $('.weui_switch').attr('data-price', n)
                } else {
                    $('.weui_switch').attr('data-price', 0)
                }
                _this.getLastPrice();
            },
            getLastPrice: function () {
                var _this = this;
                // var money = parseFloat($('.car-list .amo').attr('data-price2') - $('.weui_switch').attr('data-price') - $('#yhq').attr('data-price'));
                var money = parseFloat($('.car-list .amo').attr('data-price2') - $('#yhq').attr('data-price') + _this.zxprice);
                console.log(_this.zxprice)
                if (money < 0) {
                    money = 0
                }
                money = parseFloat(Number(money) + Number($('.postage').attr('data-postage'))).toFixed(2);
                $('.car-list .amo').attr('data-price', money);
                var price = $('.car-list').find('.amo').attr('data-price');
                $('.car-list').find('.amo').html(price)
            },
            getsettime: function () {
                // $('.settime').on('click', function () {
                //     $('.confirm-order').hide();
                //     $('.timebox').show();
                // })
                // $('.time-btn').on('click', function () {
                //     $('.confirm-order').show();
                //     $('.timebox').hide();
                // })

                var currYear = (new Date()).getFullYear();
                var opt = {};
                opt.date = {preset: 'date'};
                opt.datetime = {preset: 'datetime'};
                opt.time = {preset: 'time'};
                opt.default = {
                    theme: 'android-ics light', //皮肤样式
                    display: 'modal', //显示方式
                    mode: 'scroller', //日期选择模式
                    dateFormat: 'yyyy-mm-dd',
                    lang: 'zh',
                    showNow: true,
                    nowText: "今天",
                    // startYear: currYear, //开始年份
                    endYear: currYear + 10, //结束年份
                    minDate: new Date(),
                    stepMinute: 15
                };
                var optDateTime = $.extend(opt['datetime'], opt['default']);
                $("#peistime").mobiscroll(optDateTime).datetime(optDateTime);

            }
        }
    })
})



