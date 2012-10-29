$(function() {
	
	var cached = {};
	
	function template ($target, options) {
		var dataType = $target.attr('data-type');
		var tmplId = dataType + '-tmpl';
		
		if(typeof cached.dataType === 'undefined') {
			cached[dataType] = $('#' + tmplId).html();
		}				
		var tmpl = cached[dataType];
		var html = Mustache.render(tmpl, options);
		
		return html;
	}
	
	$('li.drags>a').draggable({
		opacity: 0.8,
		cursor: "move",
		revert: "invalid",
		helper: function() {
			var html = template($(this), {});
			return $(html);
		}
	});
	
	$('#form-canvas>div>div, #form-table>tbody>tr>td>div.drops').droppable({
		accept: 'li.drags>a, #form-canvas>div>div>.input-box',
		drop: function(event, ui) {
			var el = ui.draggable[0];
			var $source = $(el);
			var tag = el.tagName.toLowerCase();
			
			if(tag !== 'a') {
				var source = $(el).removeClass('drags-box').attr('opacity', 1.0);
				$(this).empty().append(source);				
				return;
			}
						
			var html = template($source, {});			
			var $item = $(html).removeClass('drags-box');
			
			$(this).empty().append($item);
			
			$(this).find('.input-box').draggable({
				opacity: 0.8,
				helper: function() {
					return $(this).addClass('drags-box');
				}
			});	
		}	
	});

	$('#box').bind('mousedown', function(mde) {
		mde.preventDefault();
		
		var mdeX = mde.pageX;
		var mdeY = mde.pageY;
		
		var $this = $(this);		
		var $temp = $this.clone();		
		$('body').append($temp);
		
		var halfHeight = $temp.outerHeight() / 2;
		var halfWidth = $temp.outerWidth() / 2;
		
		var top = mdeY - halfHeight;
		var left = mdeX - halfWidth;
		
		$temp.css({
			position: 'absolute',
			top: top + 'px',
			left: left + 'px',
			opacity: '0.8'
		}).show();
		
		$('body').bind('mousemove', function(mme) {
			var mmeX = mme.pageX;
			var mmeY = mme.pageY;
			
			var mTop = mmeY - halfHeight;
			var mLeft = mmeX - halfWidth;
			
			$temp.css({
				top: mTop + 'px',
				left: mLeft + 'px'
			});
		});
		
		$temp.bind('mouseup', function(mue) {
			mue.preventDefault();
			
			$this.css({
				position: 'absolute',
				top: $temp.css('top'),
				left: $temp.css('left')
			});
			
			$('body').unbind('mousemove');			
			$temp.unbind('mouseup');
			$temp.remove();
		});
	});
});


