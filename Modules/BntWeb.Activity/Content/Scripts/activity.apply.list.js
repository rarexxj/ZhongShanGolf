jQuery(function ($) {
    $('#ActivityTypeTable').dataTable({
        "processing": true,
        "serverSide": true,
        "sorting": [[5, "desc"]],
        "ajax": url_loadPage,
        "aoColumns":
        [
            { "mData": "RealName", 'sClass': 'left', "orderable": false },
            { "mData": "PhoneNumber", 'sClass': 'left', "orderable": false },
            { "mData": "Almost", 'sClass': 'left', "orderable": false },
               { "mData": "MemberCard", 'sClass': 'left', "orderable": false },
            {
                "mData": "GuestOne",
                'sClass': 'left', "orderable": false,
                "mRender": function(data, type, full) {
                    if (data != "" || full.GuestTwo != "" || full.GuestThree != "") {
                        return data + "," + full.GuestTwo + "," + full.GuestThree;
                    }
                    return "无嘉宾";
                }
            },
                {
            	"mData": "ApplyTime", 'sClass': 'left', "mRender": function (data, type, full) {
            	    if (data != null && data.length > 0) {
            	        return eval('new ' + data.replace(/\//g, '')).Format("yyyy-MM-dd hh:mm");
            	    }
            	    return "";
            	}
                }
        ]
    });
});