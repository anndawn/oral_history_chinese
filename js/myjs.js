$(".choice2").click(function () {
  $(".history").hide()
  $(".historyedu").show()
});
$(".choice1").click(function () {
  $(".historyedu").hide()
  $(".history").show()
})
$(".choice3").click(function () {
  $(".ch5content").hide()
  $(".ch4content").hide()
  $(".ch3content").show()
})
$(".choice4").click(function () {
  $(".ch5content").hide()
  $(".ch3content").hide()
  $(".ch4content").show()
})
$(".choice7").click(function () {
  $(".ch6content").hide()
  // $(".ch5content").hide()
  $(".ch7content").show()
})
$(".choice6").click(function () {
  $(".ch7content").hide()
  // $(".ch5content").hide()
  $(".ch6content").show()
})
$(".choice5").click(function () {
  $(".ch4content").hide()
  $(".ch3content").hide()
  $(".ch5content").show()
})
$(".choice9").click(
  function () {
    $("#tolerance").hide();
    $("#justice").show();
    $(".nav-link").removeClass("active");
    $(".nav-link2").addClass("active");
    $(".story").fadeIn();
  }
)
$(".choice8").click(
  function () {
    $("#tolerance").show();
    $("#justice").hide();
    $(".nav-link").removeClass("active");
    $(".nav-link1").addClass("active");
    $(".story").fadeIn();
  }
)
$(".nav-link3").click(
  function () {
    $(".story").fadeOut();
  }
)
$(".nav-link2").click(
  function () {
    $("#tolerance").fadeOut();
    $(".nav-link").removeClass("active")
    $(this).addClass("active");
    $("#justice").fadeIn()
  }
);
$(".nav-link1").click(
  function () {
    $("#justice").fadeOut();
    $(".nav-link").removeClass("active")
    $(this).addClass("active");
    $("#tolerance").fadeIn()
  }
)
$(".limit").click(function () {
  $(".box-white").css("background-color","rgba(0, 0, 0, 0.4)")
  $(".limit-text").css("color","white")
})
$(".box-white:not('.limit')").click(function () {
  $(".box-white").css("background-color","rgba(255, 255, 255, 0.3)")
})
