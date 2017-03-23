jQuery(function ($) {
    var name = $("#Name").val();

    var goodsTable = $('#MembersTable').dataTable({
        "processing": true,
        "serverSide": true,
        "sorting": [[3, "desc"]],
        "ajax": {
            "url": url_loadPage,
            "data": function (d) {
                //添加额外的参数传给服务器
                d.extra_search = { "Name": name };
            }
        },
        "aoColumns":
		[
			{ "mData": "Name", 'sClass': 'left', "orderable": false },
			{ "mData": "Discount", 'sClass': 'left', "orderable": false },
            	{ "mData": "Integral", 'sClass': 'left', "orderable": false },
            			{
            			    "mData": "CreateTime", 'sClass': 'left',
            			    "mRender": function (data, type, full) {
            			        if (data != null && data.length > 0) {
            			            return eval('new ' + data.replace(/\//g, '')).Format("yyyy-MM-dd");
            			        }
            			        return "";
            			    }
            			},
			{
			    "mData": "Id",
			    'sClass': 'center',
			    "sWidth": "150px",
			    "orderable": false,
			    "mRender": function (data, type, full) {
			        var render = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
			        render += '<a class="blue" href="' + url_editGuest + '?id=' + full.Id + '" title="编辑"><i class="icon-pencil bigger-130"></i></a>';
			        render += '<a class="red delete" data-id="' + full.Id + '" href="#" title="删除"><i class="icon-trash bigger-130"></i></a>';
			        var integralBill = url_integralBill.replace('%5BmemberId%5D', full.Id);
			        render += '<a class="blue" data-id="' + full.Id + '" href="' + integralBill + '" title="积分明细"><i class="icon-star bigger-130"></i></a>';
			        render += '</div>';
			        return render;
			    }
			}
		]
    });

    //查询
    $('#QueryButton').on("click", function () {
        name = $("#Name").val();
        goodsTable.api().ajax.reload();
    });


    $('#MembersTable').on("click", ".delete", function (e) {
        var id = $(this).data("id");

        bntToolkit.confirm("删除后不可恢复，确定还要删除该嘉宾吗？", function () {
            bntToolkit.post(url_deleteGuest, { Id: id }, function (result) {
                if (result.Success) {
                    $("#MembersTable").dataTable().fnDraw();
                } else {
                    bntToolkit.error(result.ErrorMessage);
                }
            });
        });
    });
});