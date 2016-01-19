$(document).ready(function() {
	/* IIFE for namespacing*/
	(function(){
		var reloadFactor = 0 ;

		/*Hide page 2, on page load*/
		$('.page-2').hide();

		/*Hide about,projects text, because it is being overidden(write) from the material code*/
		$('section[name="about"]').css("display","none");
		$('section[name="my-experience"]').css("display","none");
		$('section[name="fun-path"]').css("display","none");
		$('section[name="links"]').css("display","none");

		/*Hide Arrow push to page-2 on load*/
		$('.fa-arrow-up').hide();


		/* Heading Click me SplitText Animation*/
		var globeText = new SplitText(".click-globe", {type:"chars"}),
		numGlobeChars = globeText.chars.length,
		globeTl = new TimelineMax({delay:0.5});
		TweenLite.set('.click-globe', {visibility:"visible"}); 
		globeTl.staggerFrom(globeText.chars, 1,
		{
			ease:  Elastic.easeOut.config(1, 0.3),
			x:100,
			color: "#ffdb00",
			fontSize: "3rem",
			rotation: "180",
			marginLeft:"-5%",

		},0.01);

		/*Custom Jquery Function to scroll to a particular element (DEPRECIATED)*/
		/*GSOC scrollTo Plugin is a better option, I used this function before I knew about the plugin*/
		$.fn.scrollView = function (offset) {
			return this.each(function () {
				if(offset){
					$('html, body').animate({
						scrollTop: $(this).offset().top - offset, 
					}, 1000);
				} else {
					$('html, body').animate({
						scrollTop: $(this).offset().top 
					}, 1000);
				}

			});
		}

		/*check the href and scroll accordingly*/
		if($('.page-2').css("display") != "none"){
			if($('.page-2').css("display") === "block"){
				if((window.location.href.indexOf('about') != -1) || (window.location.href.indexOf('my-experience') != -1) || (window.location.href.indexOf('fun-path') != -1) || (window.location.href.indexOf('links') != -1)){
					$('.page-2').scrollView();
				}
			}
		}

		/*On Click Globe Scroll Down to The Fail SVG Floader*/
		$('.hi-icon-earth').click(function(){
			if (window.matchMedia("(max-width: 950px)").matches) {
				$($('.box')[0]).scrollView(30);
			} else {
				$($('.box')[0]).scrollView(20);
			}
			if(reloadFactor != 0){
				location.reload();
			}
			reloadFactor++;
			
		});


		/*On Click any nav bar anchor link, scroll down to page-2 (WRITTEN AHEAD OF SEQUENCE)*/

		$('a[href="#about"],a[href="#my-experience"], a[href="#fun-path"], a[href="#links"]').click(function(){
			if($('.page-2').css("display") != "none"){
				setTimeout(function(){
					$('.page-2').scrollView();
				}, 1000);
			}
		})
		

		/*The Fail SVG Loader Code and Object Config*/
		var e = new ElasticProgress(document.querySelectorAll('.Download')[0], {
			colorFg: "#ed7499",
			colorBg: "#635c73",
			highlightColor: "#ed7499",
			barHeight: 14,
			barInset: 10,
			fontFamily: "Indie Flower",
			textFail: "Phew!",
			textComplete: "Phew!"
		});

		/*The Downloading Loader Dots*/
		e.onClick(function() {
			$('.downloadText').text("");
			var tl = new TimelineMax();
			tl.to(".downloadText", 3, {text:"Downloading (Please be Patient)", ease:Linear.easeNone});
			tl.to(".dots", 2.1, {text:".....", ease:Linear.easeNone, repeat:5}, "-=3");
			e.open();
		})

		e.onOpen(function() {
			fakeLoading(e, 0.3, 0.9);
		});

		e.onFail(function() {
			if (window.matchMedia("(max-width: 950px)").matches) {
				setTimeout(function(){
					$('.downloadText').text("Well, that! was a little tiring, wasn't it?");
					$('.dots').text("");
				},1000);

				setTimeout(function(){
					$($('.box')[1]).scrollView();
				},4000);
			} else {
				setTimeout(function(){
					$('.downloadText').text("Well, that! was little tiresome, wasn't it?");
					$('.dots').text("");
				},1000);
			}

			showPath();
			e.close();
		})

	/*
		INAPPROPRIATELY ARCHITECTED FUNCTIONS
		*/

		/*fakeLoading Function of the loader svg*/
		function fakeLoading($obj, speed, failAt) {
			if (typeof speed == "undefined") speed = 2;
			if (typeof failAt == "undefined") failAt = -1;
			var v = 0;
			var l = function() {
				if (failAt > -1) {
					if (v >= failAt) {
						if (typeof $obj.jquery != "undefined") {
							$obj.ElasticProgress("fail");
						} else {
							$obj.fail();
						}
						return;
					}
				}
				v += Math.pow(Math.random(), 2) * 0.1 * speed;
				if (typeof $obj.jquery != "undefined") {
					$obj.ElasticProgress("setValue", v);
				} else {
					$obj.setValue(v);
				}
				if (v < 1) {
					TweenMax.delayedCall(0.05 + (Math.random() * 0.14), l);
				}
			};
			l();
		}


		/**/

		function showPath(){
			setTimeout(function(){
				$('.container-radio').css("display","block");
			}, 4000);

			$('.js-cycle').click(function(){
				$('.container-radio').css("display","none");
				$('.blackBoardMagic').css("width","88%");
				codeStyle();
			});

			$('.js-car').click(function(){
				hideBox2();
				hideBox1();
				$('.page-2').css("display","block");
				$("section[name='about']").css("display","block");
				$("section[name='my-experience']").css("display","block");
				$("section[name='fun-path']").css("display","block");
				$("section[name='links']").css("display","block");
				$("a[href='#fun-path']").css("display","block");
				$('.selective-section').css("display","block");
				scrollPage2();
			});
		}

		/*The Automatic Text Function*/
		function codeStyle(){
			var tl_2 = new TimelineMax();
			tl_2.to(".blackBoard", 8,{text:"This is going to be me talking for the next four minutes, it can get pretty sloppy, but please bear with me. I spent 3 days making this thing :)", ease:Linear.easeNone, delay:1});
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});
			tl_2.to(".box--centered", 2, {scale:0, ease:Bounce.easeOut});
			tl_2.to(".box--centered", 1, {display:"none", ease:Linear.easeOut});

			tl_2.to(".blackBoard", 0.01, {marginTop:"-15%"})
			tl_2.to(".blackBoard", 15, {text:"A group of five 2015 batch passouts attended the 4th Bangalore Chapter Alumni Meet, and had some stark revelations. Many of those are documented on the details page, which you'll be directed to after this message self destructs", ease:Linear.easeNone});
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut})
			tl_2.to(".blackBoard", 35, {text:"Enter: Manik Karol, CSE 2004 passout, has worked with Oracle, Intel, PayPal, and now works with Snapdeal. “In our days, there used to be an educational academic trip for every branch. I went against teachers and even some of my classmates to persuade everybody to go to Bangalore to actually gain something out of it, instead of going to someplace which would only serve the ‘fun’ purposes”, he said. “I made everybody pay more, planned the whole trip, but it was worth the criticism and effort.", ease:Linear.easeNone}, '+=1');
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});

			tl_2.to(".blackBoard", 8, {text:"Following is an excerpt from a conversation that Anand Mohan (2015 passout) had with Manik Karol", ease:Linear.easeNone});
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});

			tl_2.to(".blackBoard", 15, {text:"Anand: Manik Sir, why is that the placements of our college don't increase significantly? Why don't companies visit us, despite yearly efforts? Why is that location is continuing to be a delimiting factor for placements?", ease:Linear.easeNone}, "+=1");
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});
			tl_2.to(".blackBoard", 38, {text:"Manik Sir: Do you think that you can just call an HR of a company at the niche point, and expect them to comply with your request to come to your college at that very instant, when the company would have invested a year in planning the schedules and the budgets of God knows how many colleges? This approach was, is and always will be faulty. The day when a second year guy would be as active in contacting companies for placements and internships as final year, then things would start changing. Never Before. I don't get it how current students can be happified by the limit of the highest package of college, that is significantly lower than almost every other NIT. We deserve more!", ease:Linear.easeNone},"+=1");
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});

			tl_2.to(".blackBoard", 15, {text: "Enter: Kumar Ashutosh, ECE 2007 passout, the then SRIJAN Editor, works with Microsoft. He called me up one night in the final year to ask about the placements in the college and said this:", ease:Linear.easeNone},'+=1');
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});

			tl_2.to(".blackBoard", 34, {text:"\"This has to stop. The placement architecture of the college is not a scalable project. You can't expect to get companies on board simply by calling them or mailing them without prior contact. There should be a placement cell with for example 30 members, just like any other club, which works together tirelessly to get companies on board. Members should consist of students from all years, so that a first year should have contacts to build on instead of starting from scratch when he/she comes in final year.\"", ease:Linear.easeNone}, '+=1');
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});

			tl_2.to(".blackBoard", 22, {text:"Enter: Tilakesh Murthy, MED 2006 passout, has worked with OTIS, Flowserve, and L&T, has been working with Ford for the past 4 and a half years in Supply Chain Management (SCM). He has been one of the most active alumnus of the college. In the Alumni meet this year, he said this:", ease:Linear.easeNone}, '+=1');
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});

			tl_2.to(".blackBoard", 26, {text:"\"As Alumni, we have a reponsibility to mentor our juniors, career wise, because we are more experienced and can help current students make career choices rather than job choices when they sit for placements. This is the problem. Current students pass out with a job, but they only are able to decide upon their career (what they want to do), after some months or years into the job.\"", ease:Linear.easeNone}, '+=1');
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});

			tl_2.to(".blackBoard", 15, {text:"A Fun Fact: Tilakesh started an initiative to collect contributions from Bangalore Alumni Chapter, from all those who wanted to contribute for one version of Hill'ffair (I don't remember which one), to successfully sponsor 40,000 Rupees", ease:Linear.easeNone});
			tl_2.to(".conversation",2,{text:""});
			tl_2.to(".blackBoard", 2, {text:"", ease:Power2.easeOut});

			tl_2.to(".blackBoard", 0.01, {display:"none"});

			tl_2.to(".scramble",0.01, {marginTop: "-15%"})
			tl_2.to(".scramble", 3, {scrambleText: "This Message Will Self Destruct in"});
			tl_2.to(".scramble", 0.01, {fontSize: "10rem"});	
			tl_2.to(".scramble",0.01, {marginLeft: "45%"})	
			tl_2.to(".scramble", 1, {scrambleText: "5"});
			tl_2.to(".scramble", 1, {scrambleText: "4"});
			tl_2.to(".scramble", 1, {scrambleText: "3"});
			tl_2.to(".scramble", 1, {scrambleText: "2"});
			tl_2.to(".scramble", 1, {scrambleText: "1"});






			// tl_2.to(".countDown",1, {scrambleText: "5"});
			// tl_2.to(".countDown",1, {scrambleText: "4"});
			// tl_2.to(".countDown",1, {scrambleText: "3"});
			// tl_2.to(".countDown",1, {scrambleText: "2"});
			// tl_2.to(".countDown",1, {scrambleText: "1"});


			// tl_2.to(".countDown", 1, {text:"", ease: Bounce.easeOut});
			tl_2.to(".scramble", 1, {text:"", ease: Bounce.easeOut, onComplete: hideBox2});
			tl_2.to(".page-2", 0.01, {display: "block"});
			tl_2.to(".page-2", 0.01, {marginTop: "-5%"});
			tl_2.to("section[name='about']", 0.01, {display: "block"});
			tl_2.to("section[name='my-experience']", 0.01, {display: "block", onComplete: scrollPage2});
			tl_2.to("section[name='fun-path']", 0.01, {display: "block", onComplete: scrollPage2});
			tl_2.to("section[name='links']", 0.01, {display: "block", onComplete: scrollPage2});
		}

		function scrollPage2(){
			$('.page-2').scrollView();
		}

		function hideBox2(){
			$('.box-2').hide();
		}
		function hideBox1(){
			$('.box--centered').hide();
		}

		/*When it's the end of window scroll show arrow (this actually should be the end of about and experience element scrolls but it's okay for now)*/
		$(window).scroll(function() {
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				$('.fa-arrow-up').show();
			}
		});	

		/*hide arrow if arrow is above page-2*/
		$(window).scroll(function() {
			if(window.scrollY <= Math.floor($('.page-2').offset().top)) {
				$('.fa-arrow-up').hide();
			}
		});

		/*on arrow click scroll to start of page-2*/
		$('.fa-arrow-up').click(function(){
			$('.page-2').scrollView();
		});

	})();
});


