// set global vars
var firstName;

// get this party started with first node set
$(window).on('load', function() {
  $('.nodes-content').mCustomScrollbar();
  setTimeout(function() {
    node_set_1();
  }, 500);
});

// update scroll position after each node
function updateScrollbar() {
  $('.nodes-content').mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

// There are several types of nodes
// - bot_text: a message from the chatbot
// - bot_image: an image from the chatbot
// - bot_video: a video from the chatbot
// - bot_url: a link to a web page
// - user_quick_reply: a user's button click reply (uses .user-reply style)
// - user_text_reply: a user's text input reply (uses .user-reply style)
// - user_carousel_selection: a set of cards that the user can click on


// post the nodes to the chat window
function post_nodes(node_content) {
  var p = 0;
  for (let i of node_content) {
    setTimeout(function() {
      $(i).appendTo($('.mCSB_container')).addClass('new');
      updateScrollbar();
    }, node_content.indexOf(i) * 2000);
  }
}

// user_quick_reply
function user_quick_reply(node_content) {
  $('<div class="node user-reply">' + node_content + '</div>').appendTo($('.mCSB_container')).addClass('new');
  updateScrollbar();
}

// user_text_reply
function user_text_reply() {
  node_content = $('.user-text-reply-input').val();
  $('<div class="node user-reply">' + node_content + '</div>').appendTo($('.mCSB_container')).addClass('new');
  $('.user-text-reply-input').val(null);
  $('.user-text-reply-box').hide();
  updateScrollbar();
}

// BUTTON CLICKS /////////////////////////////////////////////////////

// go to node set 2
$(document).on('click','#button-1',function(){
  $(this).hide();
  user_quick_reply(node_content='Oh, like this?');
  setTimeout(function() {
    node_set_2();
  }, 500);
});

// show amazon scorecard
$(document).on('click','.show-card-amazon',function(){
  $('.card-amazon').slideDown('fast');
});

// close scorecard
$(document).on('click','.card-btn-close',function(){
  $(this).parent().parent().slideUp('fast');
});



// NODE SETS /////////////////////////////////////////////////////

// node set 1 /////////////////////////////////////////////////////
function node_set_1() {
  var node_content = [
    // this first div is just a spacer so the first message appears at the bottom
    '<div style="height:800px;"></div>',
    '<div class="node bot-text">Hi there! We created this app to help people realize and embrace their power.</div>',
    '<div class="node bot-text">My name is M, and I\'ll be your guide here. Here\'s me:</div>',
    '<div class="node bot-text">This is how it works. You just tap the button below and I\'ll respond.</div>',
    '<div class="node user-quick-reply" id="button-1">Oh, like this?</div>',
  ]
  post_nodes(node_content);
}

// node set 2 /////////////////////////////////////////////////////
function node_set_2() {
  var node_content = [
    '<img class="node bot-image" width="260" height="123" src="img/phil-yeah.gif">',
    '<div class="node bot-text">Yeah, that\'s it!</div>',
    '<div class="node bot-text">Okay, I need to know what to call you. What’s your first name?</div>',
  ]
  post_nodes(node_content);
  setTimeout(function() {
    $('.user-text-reply-box').show();
    updateScrollbar();
    $('.user-text-reply-input').focus();
  }, 6000);

  // insert text reply on Done button or enter key
  $('.user-text-reply-submit').click(function() {
    firstName = $('.user-text-reply-input').val();
    user_text_reply();
    setTimeout(function() {
      node_set_3();
    }, 500);
  });
  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      firstName = $('.user-text-reply-input').val();
      user_text_reply();
      setTimeout(function() {
        node_set_3();
      }, 500);
      return false;
    }
  });
}

// node set 3 /////////////////////////////////////////////////////
function node_set_3() {
  var node_content = [
    '<div class="node bot-text">Awesome, thanks for that. It’s great to meet you, ' + firstName + '!</div>',
    '<div class="node bot-text">Hey, do you do business with any of these companies? (You can tap to learn more.)</div>',
    '<div class="node user-carousel-selection">' +
    '<div class="show-card-amazon user-carousel-card"><img src="img/logos/amazon.svg"></div>' +
    '<div class="show-card-apple user-carousel-card"><img src="img/logos/apple.png"></div>' +
    '<div class="show-card-jpmorgan user-carousel-card"><img src="img/logos/jpmorgan.png"></div>' +
    '<div class="show-card-starbucks user-carousel-card"><img src="img/logos/starbucks.png"></div>' +
    '<div class="show-card-fedex user-carousel-card"><img src="img/logos/fedex.png"></div>' +
    '</div>',
  ]
  post_nodes(node_content);
}
