$(function () {
    $.ADDLOAD();
    $.checkuser();
    new Vue({
        el: '#singlepage',
        data: {
            info: []
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
        },
        methods: {
            infoajax: function () {
                var _this=this;
                $.ajax({
                    url: '/Api/v1/Page/' + '04',
                    type:'get',
                    dataType:'json'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        $.RMLOAD();
                    }
                })
            }
        }
    })
})