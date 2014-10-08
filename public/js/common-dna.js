var DNA={};
DNA.UI = {
	init: function() {
		this.addEvent();
		//this.drawSVG();
	},
	snbMenu: function() {
		var snbMenuItem = $('.wrap_dna .snb_g .nav-tabs .link_nav');
		var consoleSection = $('.wrap_dna .section_tab');
		snbMenuItem.each(function(i, el) {
			$(el).click(function(e) {
				e.preventDefault();
				$('.wrap_dna .snb_g li').removeClass('active');
				$(el).parent().addClass('active');
				consoleSection.each(function(j, el2) {
					if(i === j) {
						$(el2).show();
					} else {
						$(el2).hide();
					}
				});
			});
		});
	},
	drawSVG: function() {

		var logoDaum = Raphael('logoDaum', '49.858', '20.391');
		var group_a = logoDaum.set();
		var path_b = logoDaum.path("M32.726,4.262V0h-4.361v7.08c0,1.17-0.992,2.121-2.21,2.121c-1.218,0-2.21-0.951-2.21-2.121V0h-4.36v7.057   c2.721,0.834,4.711,3.237,4.822,6.096c0.558,0.148,1.142,0.234,1.748,0.234c1.501,0,2.882-0.491,3.99-1.308V8.997   C30.146,7.039,31.169,5.308,32.726,4.262").attr({fill: '#FEBC00',parent: 'group_a','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_b');
		var path_c = logoDaum.path("M43.841,3.22c-1.458,0-2.796,0.501-3.838,1.331C38.96,3.721,37.621,3.22,36.164,3.22   c-1.278,0-2.462,0.387-3.437,1.042c-1.558,1.046-2.581,2.777-2.581,4.735v3.082v4.71h4.361V8.997c0-0.877,0.743-1.59,1.657-1.59   c0.914,0,1.658,0.714,1.658,1.59v7.792h4.361V8.997c0-0.877,0.744-1.59,1.658-1.59c0.913,0,1.657,0.714,1.657,1.59v7.792h4.36   V8.997C49.858,5.812,47.158,3.22,43.841,3.22").attr({fill: '#F2685E',parent: 'group_a','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_c');
		var path_d = logoDaum.path("M13.314,8.09C12.476,5.191,9.71,3.054,6.428,3.054H0v13.735h6.428c1.631,0,3.132-0.533,4.336-1.418   c1.709-1.256,2.817-3.227,2.817-5.448C13.581,9.288,13.483,8.675,13.314,8.09 M6.428,12.602H4.361V7.241h2.067   c1.54,0,2.792,1.203,2.792,2.682C9.22,11.4,7.968,12.602,6.428,12.602").attr({fill: '#618FFC',parent: 'group_a','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_d');
		var path_e = logoDaum.path("M24.408,13.153c-0.112-2.859-2.101-5.262-4.822-6.096c-0.664-0.203-1.371-0.315-2.104-0.315   c-1.565,0-3.005,0.505-4.167,1.347c0.169,0.585,0.266,1.197,0.266,1.833c0,2.221-1.108,4.192-2.817,5.448   c0.764,2.881,3.482,5.02,6.718,5.02c1.517,0,2.918-0.475,4.061-1.271c0.653,0.567,1.577,0.934,2.878,1.122v-6.377V13.73v-0.184   v-0.143C24.421,13.319,24.411,13.236,24.408,13.153 M20.06,13.73c0,1.365-1.157,2.475-2.579,2.475c-1.422,0-2.579-1.11-2.579-2.475   v-0.327c0-1.365,1.157-2.475,2.579-2.475c1.422,0,2.579,1.11,2.579,2.475V13.73z").attr({fill: '#ADC900',parent: 'group_a','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_e');
		group_a.attr({'name': 'group_a'});
		var logoDaumGroups = [group_a];
		group_a.push(
			path_b ,
			path_c ,
			path_d ,
			path_e 
		);

	},
	addEvent: function() {
		$('.test_modal').click(function() {
			DNA.UI.modalPopup('.modal_g');
		});
	},
	modalPopup: function(modalEl) {
		if($(modalEl).hasClass('modal_on')) {
			$(modalEl).removeClass('modal_on');
		} else {
			$(modalEl).addClass('modal_on');
		}
		$('.modal_overlay, .modal_g .btn_close').click(function() {
			$(modalEl).removeClass('modal_on');
		});
	}
};
$(document).ready(function() {
	DNA.UI.init();
	DNA.UI.snbMenu();
});