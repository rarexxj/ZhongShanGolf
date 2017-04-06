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
    ids.IsFromCart = false;
    console.log(ids);
    new Vue({
        el: '#main',
        data: {
            info: [],
            data1: ids,
            ztinfo: [],
            ztbtn: false,
            allprice: ''
        },
        ready: function () {
            var _this = this;
            _this.ajax();
            _this.$nextTick(function () {
                _this.ztaddress();
                _this.link();
                _this.prosubmit();
                // $.RMLOAD();
            })
        },
        methods: {
            ajax: function () {
                var _this = this;
                console.log(_this.data1)
                $.ajax({
                    url: '/Api/v1/Mall/OrderCalculation',
                    data: _this.data1,
                    type: 'post'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        _this.allprice = Number(rs.data.GoodsAmount)+Number(rs.data.ShippingFee);
                        _this.allprice = _this.allprice.toFixed(2);
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
                            RegionName:_this.info.Addresses.RegionName,
                            Address: _this.info.Addresses.Address,
                            Tel: _this.info.Addresses.Phone,
                            Integral: '',
                            Memo: $('.bz').val(),
                            TakeTheir: _this.ztbtn,
                            Goods: prodata
                        }
                        console.log(message)
                        _this.inputajax(message);
                    }
                })
            },
            inputajax: function (message) {
                var _this=this;
                $.ajax({
                     url:'/Api/v1/Mall/Order',
                    data: message,
                    type: 'post'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        window.location.replace("/Html/html/shopcar/pay.html?id=" + rs.data.Id + '&OrderNo=' + rs.data.OrderNo + '&money=' + _this.allprice+ '&time=' + rs.data.CreateTime + '&taketheir='+rs.data.TakeTheir)
                    }
                })
            },
            ztshow: function () {
                var _this = this;
                if ($('.weui_switch').is(':checked')) {
                    _this.ztbtn = true;
                } else {
                    _this.ztbtn = false;
                }
            },
            ztaddress: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/WebsConfiguration',
                    type: 'get',
                    dataType: 'json'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.ztinfo = rs.data;
                    }
                })
            }
        }
    })
})



