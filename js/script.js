let win = $(window);
foo = $('#typer');
foo.typer(['Développeur Front-End', 'Développeur FullStack JavaScript', 'Développeur PHP']);

$(function(){

    /* AJAX CONTACT FROM */
    $('#contact-form').submit(function(e){
        e.preventDefault();
        let postData = $('#contact-form').serialize();

        $.ajax({
            method: "POST",
            url: "./contact.php",
            data: postData,
            dataType: 'json',
            error: function(){
                $('#contact-form').prepend('Erreur lors du chargment de la page !');
            },
            success: function(result) {

                if(result.isSuccess){
                    $('#contact-form').prepend('<div class="success">Le message à bien été envoyé. Merci de m\'avoir contacté !</div>');
                    $('#contact-form')[0].reset();
                } else {
                    $('#contact-form').prepend().html(result.error);
                }
            }
        });
    });

    /* SMOOTH SCROLL */
    $('.js-scrollTo').on('click', function() { // Au clic sur un élément
        let page = $(this).attr('href'); // Page cible
        let speed = 750; // Durée de l'animation (en ms) 
        $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
        return false;
    });

    // $('body').scrollspy({ target: '#nav' });

    /* NAVBAR SCROLL */
    $('#nav').hide();
    $(window).scroll(function(){
    	if($(window).scrollTop())
    		$('#nav').show().addClass('navbar-active');
    	else
    		$('#nav').hide().removeClass('navbar-active');
    });
     
    // SCROLL ANIMATION SECTION SKILL
    $(window).scroll(function() {
    $(".anm_mod").each(function() {
     const position = $(this).offset().top;
     const scroll = $(window).scrollTop();
     const windowHeight = $(window).height();
     if (scroll > 950) {
      $(this).addClass("active-scroll");
     }
     if (scroll < 100) {
      $(this).removeClass("active-scroll");
     }
    });  
   });

    // SCROLL COUNTER NUMBERS
    const scroll = $(window).scrollTop();
    (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};
            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from:            $(this).data('from'),
                    to:              $(this).data('to'),
                    speed:           $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals:        $(this).data('decimals')
                }, options);
                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;
                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};
                $self.data('countTo', data);
                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);
                // initialize the element with the starting value
                render(value);
                function updateTimer() {
                    value += increment;
                    loopCount++;
                    render(value);
                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }
                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;
                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }
                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };
        $.fn.countTo.defaults = {
            from: 0,               // the number the element should start at
            to: 0,                 // the number the element should end at
            speed: 1000,           // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,           // the number of decimal places to show
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };
        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));
    // if (scroll > 0) {
        jQuery(function ($) {
      // custom formatting example
      $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });
      // start all the timers
      $('.timer').each(count);  
      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }
    });
    // }

});

// $(window).scroll( function() { 
//     var scrolled_val = $(document).scrollTop().valueOf();
//     alert(scrolled_val+ ' = scroll value');
//    });