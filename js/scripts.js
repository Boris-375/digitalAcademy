// JavaScript Document

function checkCurrent_SliderDirections(sliderDirections){
	//Вкл/вкл кнопок
	if ((sliderDirections.item_current+1) == sliderDirections.items){
		$(".slider-directions_navbar_right").prop("disabled", true);
	}
	else{
		$(".slider-directions_navbar_right").prop("disabled", false);
	}
	if (sliderDirections.item_current == 0){
		$(".slider-directions_navbar_left").prop("disabled", true);
	}
	else{
		$(".slider-directions_navbar_left").prop("disabled", false);
	}
	$(".slider-directions_navbar_info_current").text(sliderDirections.item_current + 1);
	//Выделение текущего
	$(".slider-directions_item").removeClass('current');
	$(".slider-directions_item").eq(sliderDirections.item_current).addClass('current');
}

function init_SliderDirections(sliderDirections){
	sliderDirections.items = $(".slider-directions_item").length;
	sliderDirections.item_width = parseInt($(".slider-directions_item").css("width"), 10);
	sliderDirections.slider_width = parseInt($(".slider-directions_visible").css("width"), 10);
	//Получаем sliderDirections.item_margin
	//Кол-во влезающих слайдов
	sliderDirections.item_visible = parseInt(sliderDirections.slider_width / sliderDirections.item_width, 10);
	//Кол-во влезающих слайдов с минимальны отступом
	if(sliderDirections.item_visible>1){
		sliderDirections.item_visible = parseInt((sliderDirections.slider_width - sliderDirections.item_visible * sliderDirections.item_margin_min) / sliderDirections.item_width, 10);
	}
	//Остающееся пустое пространство
	let empty = sliderDirections.slider_width - sliderDirections.item_visible * sliderDirections.item_width;
	//Если влезает только один на экран то центрируется
	if (sliderDirections.item_visible === 1){
		sliderDirections.item_margin = empty;
		$(".slider-directions_item").css({
											"margin-right":sliderDirections.item_margin/2,
											"margin-left":sliderDirections.item_margin/2
										});
	}
	else{
		sliderDirections.item_margin = empty / (sliderDirections.item_visible - 1);
		$(".slider-directions_item").css({
										"margin-right":sliderDirections.item_margin,
										"margin-left": 0});//Без этого некорректна смена 1 => 2
		$(".slider-directions_item:last-of-type").css("margin-right", 0);
	}
	//Скрытие навбара если только один экран
	if (sliderDirections.items == sliderDirections.item_visible){
		$(".slider-directions_navbar").css("display", "none");
		//Выбор текущим среднего (примерно)
		if(sliderDirections.item_visible > 1){
			sliderDirections.current = Math.round(sliderDirections.item_visible/2);
			$(".slider-directions_item").removeClass('current');
			$(".slider-directions_item").eq(sliderDirections.current - 1).addClass('current');
		}
	}
	else{
		$(".slider-directions_navbar").css("display", "flex");
	}
	sliderDirections.item_total_width = sliderDirections.item_width + sliderDirections.item_margin;
	$(".slider-directions_navbar_info_current").text(sliderDirections.item_current + 1);
	$(".slider-directions_navbar_info_total").text(sliderDirections.items);
	//Сдвиг при ресайзе
	let total = sliderDirections.item_total_width;
	$(".slider-directions_visible_wrapper").css("transform", "translateX(-"+(total*sliderDirections.item_current)+"px)");
}

function prev_SliderDirections(sliderDirections){
	let button = $(".slider-directions_navbar_left");
	button.click(function() {
		if(sliderDirections.item_current > 0){
			let total = sliderDirections.item_total_width;
			sliderDirections.item_current--;
			if((sliderDirections.item_current + sliderDirections.item_visible) <= sliderDirections.items){
				//переменная исключительно для читабельности
				let total = sliderDirections.item_total_width;
				$(".slider-directions_visible_wrapper").css("transform", "translateX(-"+(total*sliderDirections.item_current)+"px)");
			}
		}
		checkCurrent_SliderDirections(sliderDirections);
	});
}

function next_SliderDirections(sliderDirections){
	let button = $(".slider-directions_navbar_right");
	button.click(function() {
		if(sliderDirections.item_current < sliderDirections.items){
			sliderDirections.item_current++;
			//alert(sliderDirections.item_current);
			if((sliderDirections.item_current + sliderDirections.item_visible) <= sliderDirections.items){
				//переменная исключительно для читабельности
				let total = sliderDirections.item_total_width;
				$(".slider-directions_visible_wrapper").css("transform", "translateX(-"+(total*sliderDirections.item_current)+"px)");
			}
		}
		checkCurrent_SliderDirections(sliderDirections);
	});
}


function init_SliderCourseProgram (sliderCourseProgram) {
	sliderCourseProgram.items = $(".slider-courseProgram_nav_wrapper_item").length;
}

//проверка кнопки
function checkButton_SliderCourseProgram (sliderCourseProgram){
	var button_right = $(".slider-courseProgram_nav_arrow.arrow-right button");
	var button_left = $(".slider-courseProgram_nav_arrow.arrow-left button");
	if( (sliderCourseProgram.current + 1) == sliderCourseProgram.items){
		button_right.prop("disabled", true);
	}
	else{
		button_right.prop("disabled", false);
	}
	if (sliderCourseProgram.current == 0){
		button_left.prop("disabled", true);
	}
	else{
		button_left.prop("disabled", false);
	}
}

//переход по слайдам/навигации
function select_SliderCourseProgram (sliderCourseProgram, current){
	let navItem = $(".slider-courseProgram_nav_wrapper_item");
	let sliderItem = $(".slider-courseProgram_item");
	//Выбор в навигации
	navItem.eq(sliderCourseProgram.current).removeClass('select');
	navItem.eq(current).addClass('select');
	//Прокрутка
	let offset = navItem.eq(current).position().left;
	if ($(window).width()<400){
		offset = offset + navItem.parent().scrollLeft();
	}
	else{
		//40 = отступ + ширина левой стрелочки (без этого глючит)
		offset = offset - 40 + navItem.parent().scrollLeft();
	}
	
	navItem.parent().animate({scrollLeft:offset}, 400);
	//Выбор слайда
	sliderItem.eq(sliderCourseProgram.current).removeClass('show');
	sliderItem.eq(current).addClass('show');
	//смена текущего слайда
	sliderCourseProgram.current = current;
	//проверка для кнопки
	checkButton_SliderCourseProgram(sliderCourseProgram);
}

//переход кликом
function click_SliderCourseProgram (sliderCourseProgram){
	var navItem = $(".slider-courseProgram_nav_wrapper_item");
	var sliderItem = $(".slider-courseProgram_item");
	navItem.click(function() {
		let current = $(this).index();
		if (current != sliderCourseProgram.current){
			select_SliderCourseProgram (sliderCourseProgram, current);
		}
	});
}

//переход кнопкой "Назад"
function prev_SliderCourseProgram (sliderCourseProgram){
	var button = $(".slider-courseProgram_nav_arrow.arrow-left");
	button.click(function() {
		if( sliderCourseProgram.current != 0){
			select_SliderCourseProgram (sliderCourseProgram, (sliderCourseProgram.current - 1));
		}
	});
}

//переход кнопкой "Вперёд"
function next_SliderCourseProgram (sliderCourseProgram){
	var button = $(".slider-courseProgram_nav_arrow.arrow-right");
	button.click(function() {
		if( (sliderCourseProgram.current + 1) != sliderCourseProgram.items){
			select_SliderCourseProgram (sliderCourseProgram, (sliderCourseProgram.current + 1));
		}
	});
}


function showAll_SliderCourseProgram (){
	var button = $(".slider-courseProgram_item_left_all");
	var item = ".slider-courseProgram_item_left_item";
	//Для width < 400 кнопка при 3+ элемента, дял width > 400 кнопка при 6+ элементов
	if ($(window).width()<400){
		button.each(function() {
			if($(this).siblings(item).length <= 3 || $(this).parents(".slider-courseProgram_item").hasClass('noHide')){
				$(this).css("display", "none");
			}
		});
	}
	else{
		button.each(function() {
			if($(this).siblings(item).length < 6 || $(this).parents(".slider-courseProgram_item").hasClass('noHide')){
				$(this).css("display", "none");
			}
		});
	}
	button.click(function(event) {
		$(this).siblings(item).css("display", "block");
		$(this).css("display", "none");
	});
}

function initSliderOurWork (sliderOurWork){
	sliderOurWork.items = $(".ourWork_slides img").length;
	var slideshow = setInterval(nextSliderOurWorks, sliderOurWork.interval, sliderOurWork);
	$(".ourWork_slides").mouseenter(function(event) {
		clearInterval(slideshow);
	});
	$(".ourWork_slides").mouseleave(function(event) {
		slideshow = setInterval(nextSliderOurWorks, sliderOurWork.interval, sliderOurWork);
	});
}

function nextSliderOurWorks (sliderOurWork){
	if((sliderOurWork.current + 1) < sliderOurWork.items){
		sliderOurWork.current++;
	}
	else{
		sliderOurWork.current = 0;
	}
	$(".ourWork_slides img").removeClass('show');
	$(".ourWork_slides img").eq(sliderOurWork.current).addClass('show');
}

function initPhoneOurWork (phoneOurWork){
	phoneOurWork.items = $(".ourWork_phone_wrapper img").length;
}

function nextPhoneOurWork (phoneOurWork){
	if((phoneOurWork.current + 1) < phoneOurWork.items){
		phoneOurWork.current++;
	}
	else{
		phoneOurWork.current = 0;
	}
	$(".ourWork_phone_wrapper img").removeClass('show');
	$(".ourWork_phone_wrapper img").eq(phoneOurWork.current).addClass('show');
}

function prevPhoneOurWork (phoneOurWork){
	if(phoneOurWork.current > 0){
		phoneOurWork.current--;
	}
	else{
		phoneOurWork.current = phoneOurWork.items - 1;
	}
	$(".ourWork_phone_wrapper img").removeClass('show');
	$(".ourWork_phone_wrapper img").eq(phoneOurWork.current).addClass('show');
}

function buttonPhoneOurWork (phoneOurWork){
	$(".ourWork_phone_nav_prev").click(function() {
		prevPhoneOurWork (phoneOurWork);
	});
	$(".ourWork_phone_nav_next").click(function() {
		nextPhoneOurWork (phoneOurWork);
	});
}

function headerOpen(mainHeader){
	$(".mainHeader .burger, .mainHeader_backdrop").click(function() {
		if(mainHeader.isOpen){
			$(".mainHeader").removeClass('open');
		}
		else{
			$(".mainHeader").addClass('open');
		}
		mainHeader.isOpen = !mainHeader.isOpen;
	});
}

function blockAnimation(blockClass, blockAnimationClass, blockAnimationOutClass, topOffset = 80){
	var visibleOffset = document.documentElement.clientHeight;
	$(window).scroll(function(event) {
		$(blockClass).each(function(index, el){
			//верхняя граница целевого блока попадает в верхние x процентов экрана
			if(el.getBoundingClientRect().top < (visibleOffset/100 * topOffset) && $(this).hasClass('hidden')){
				$(this).removeClass(blockAnimationOutClass).removeClass('hidden').addClass(blockAnimationClass);
			}
			//верхняя граница целевого блока попадает в нижние (100 - x) процентов экрана
			if(el.getBoundingClientRect().top > (visibleOffset/100 * topOffset) && $(this).hasClass(blockAnimationClass)){
				$(this).addClass(blockAnimationOutClass).addClass('hidden').removeClass(blockAnimationClass);
			}
		});
	});
}


$(document).ready(function(){

	let sliderDirections = {
		items: 0, //кол-во слайдов
		item_width: 0, //длина слайда без отступа
		item_total_width: 0, // длина слайда с отступом
		item_margin_min: 15, // минималка
		item_margin: 0, // отступ слайда
		item_visible: 0, //кол-во влезающих на экран слайдов
		item_current: 0, //текущий слайд
		slider_width: 0, //ширина слайдера
	};
	init_SliderDirections(sliderDirections);
	next_SliderDirections(sliderDirections);
	prev_SliderDirections(sliderDirections);
	//перенастройка при ресайзе
	var isEvent = false;
	$(window).resize(function() {
		if(!isEvent){
			isEvent = true;
			setTimeout(function(){
				isEvent = false;
				init_SliderDirections(sliderDirections);
			}, 500);
		}
	});

	let sliderCourseProgram = {
		items: 0,
		current: 0
	};
	init_SliderCourseProgram (sliderCourseProgram);
	click_SliderCourseProgram (sliderCourseProgram);
	next_SliderCourseProgram (sliderCourseProgram);
	prev_SliderCourseProgram (sliderCourseProgram);
	showAll_SliderCourseProgram();//Полное описание

	let sliderOurWork = {
		items: 0,
		current: 0,
		interval: 5000
	};
	initSliderOurWork (sliderOurWork);


	let phoneOurWork = {
		items: 0,
		current: 0,
	};
	initPhoneOurWork (phoneOurWork);
	buttonPhoneOurWork (phoneOurWork);

	let mainHeader = {
		isOpen: false
	}
	headerOpen (mainHeader);


	//Анимации.
	//анимацию с трансформацией для aside не применять, т.к. ломает поворот
	if($(window).width() < 700){
		blockAnimation(".sectionHeader-animated", "lightSpeedIn", "lightSpeedOut");
	}
	else{
		blockAnimation(".sectionHeader-animated", "fadeInDown", "fadeOutUp", 100);
	}
	
	blockAnimation(".sectionFooterBlock-animated", "fadeInDown", "fadeOutUp");
	blockAnimation(".button-animated", "fadeInLeft", "fadeOutLeft");


	blockAnimation(".sliderDirections-animated", "fadeInLeft", "fadeOutLeft");
	blockAnimation(".sliderCourse-animated", "fadeInRight", "fadeOutRight");

	blockAnimation(".targetItemGirlHeader-animated", "slideInLeft", "slideOutLeft", 50);
	blockAnimation(".targetItemGirlItem-animated", "zoomInDown", "zoomOutUp", 70);
	blockAnimation(".targetItemBoyHeader-animated", "slideInRight", "slideOutRight");
	blockAnimation(".targetItemBoyItem-animated", "flipInX", "flipOutX", 70);
	
	blockAnimation(".educationItemLeft-animated", "slideInLeft", "slideOutLeft", 60);
	blockAnimation(".educationItemRight-animated", "slideInRight", "slideOutRight", 60);
	blockAnimation(".educationItemImg-animated", "fadeIn", "fadeOut", 50);

	blockAnimation(".youtube-animated", "slideInLeft", "slideOutLeft", 85);
	blockAnimation(".img1-animated", "flipInX", "flipOutX", 85);
	blockAnimation(".img2-animated", "slideInLeft", "slideOutLeft", 85);
	blockAnimation(".phone-animated", "fadeIn", "fadeOut", 90);
	blockAnimation(".freebie-animated", "flipInX", "flipOutX", 85);
	blockAnimation(".mainFooterAside-animated", "fadeIn", "fadeOut", 85);

	blockAnimation(".courseResultImg-animated", "flipInX", "flipOutX", 70);
	blockAnimation(".courseResultP-animated", "zoomIn", "zoomOut", 100);

	blockAnimation(".courseTimeImg-animated", "slideInLeft", "slideOutLeft", 70);
	blockAnimation(".courseTimeText-animated", "slideInRight", "slideOutRight", 70);

	blockAnimation(".courseTimeRightBlock-animated", "lightSpeedIn", "lightSpeedOut", 100);
	blockAnimation(".courseTimeP1-animated", "slideInLeft", "slideOutLeft", 85);
	blockAnimation(".courseTimeP2-animated", "slideInRight", "slideOutRight", 85);
	blockAnimation(".courseTimePrice-animated", "zoomIn", "zoomOut", 100);
});