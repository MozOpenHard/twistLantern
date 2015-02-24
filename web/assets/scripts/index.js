var BASE_URL, YOSHINA, append_value, base_url, calc_id, init, init_params, json_data, make_init_url, make_url, post_positions, servo_ids, timers;

// base_url = "http://www.example.com/patterns/0/scenes/";

timers = [];

json_data = [];

servo_ids = [0, 0, 0, 1, 2];

YOSHINA = 500;

BASE_URL = "http://twist.local:3002/transform?data=";

$.getJSON("data/data.json", function(data) {
  var datum, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = data.length; _i < _len; _i++) {
    datum = data[_i];
    _results.push(json_data.push(datum));
  }
  init(BASE_URL);
  return _results;
});

$(function() {
  $(document).on("click touch", ".btn", function(event) {
    var c_p, checked_duration, checked_positions, checked_wait, current_layer, duration, name, post_url, previous_column, previous_position, radio, scene, selector, target, target_radio, val, value, wait, _i, _len;
    target = $(this);
    if (target.hasClass("checked")) {
      return console.log("already");
    } else {
      previous_column = target.siblings(".checked");
      previous_column.removeClass("checked");
      previous_position = previous_column.find(".position");
      previous_position.removeAttr("checked");
      target.addClass("checked");
      current_layer = target.closest(".layer");
      radio = target.find(".position");
      name = radio.attr("name");
      value = radio.attr("value");
      selector = ".position[name='" + name + "']";
      current_layer.find(selector).val([value]);
      target_radio = current_layer.find(selector)[value];
      $(target_radio).attr("checked", "checked");
      event.preventDefault();
      scene = target.closest(".scene");
      checked_duration = scene.find(".duration.checked");
      duration = checked_duration.find(".val")[0].innerHTML;
      checked_wait = scene.find(".wait.checked");
      wait = checked_wait.find(".val")[0].innerHTML;
      checked_positions = scene.find(".layer .checked .position");
      val = [duration / 200 - 1];
      for (_i = 0, _len = checked_positions.length; _i < _len; _i++) {
        c_p = checked_positions[_i];
        append_value(val, c_p);
      }
      post_url = make_url(BASE_URL, val);
      return $.post(post_url);
    }
  });
  $(document).on("click touch", ".duration", function(event) {
    var current_durations, name, previous_column, previous_time, radio, selector, target, target_radio, value;
    target = $(this);
    if (target.hasClass("checked")) {
      return console.log("already");
    } else {
      previous_column = target.siblings(".checked");
      previous_column.removeClass("checked");
      previous_time = previous_column.find(".time");
      previous_time.removeAttr("checked");
      target.addClass("checked");
      radio = target.find(".time");
      name = radio.attr("name");
      value = radio.attr("value");
      selector = ".time[name='" + name + "']";
      console.log(selector);
      current_durations = target.closest(".durations");
      current_durations.find(selector).val([value]);
      target_radio = current_durations.find(selector)[value];
      $(target_radio).attr("checked", "checked");
      return event.preventDefault();
    }
  });
  $(document).on("click touch", ".wait", function(event) {
    var previous_column, target;
    target = $(this);
    if (target.hasClass("checked")) {
      return console.log("already");
    } else {
      previous_column = target.siblings(".checked");
      previous_column.removeClass("checked");
      target.addClass("checked");
      return event.preventDefault();
    }
  });
  $(document).on("click touch", ".add-btn", function(event) {
    var new_form, new_scene, new_url, scene_template, scenes_length;
    scene_template = $(".template").find(".scene");
    new_scene = scene_template.clone();
    new_form = new_scene.find("form");
    scenes_length = $(".scenes .scene").length;
    new_url = base_url + scenes_length;
    new_form.attr("action", new_url);
    return $(".scenes").append(new_scene);
  });
  $(document).on("ajax:error", ".scene-form", function(event, xhr, status, error) {
    alert(error.message);
    return event.preventDefault();
  });
  return $(document).on("click touch", ".play-btn", function(event) {
    var class_name, target, timer, _i, _len, _results;
    target = $(event.target);
    class_name = "is-playing";
    if (target.hasClass(class_name)) {
      target.removeClass(class_name);
      _results = [];
      for (_i = 0, _len = timers.length; _i < _len; _i++) {
        timer = timers[_i];
        _results.push(clearTimeout(timer));
      }
      return _results;
    } else {
      target.addClass(class_name);
      return post_positions(0);
    }
  });
});

post_positions = function(i) {
  var c_p, checked_duration, checked_positions, checked_wait, duration, post_url, scene, scenes, val, wait, _i, _len;
  scenes = $(".scenes .scene");
  scene = $(scenes[i]);
  checked_duration = scene.find(".duration.checked");
  duration = checked_duration.find(".val")[0].innerHTML;
  checked_wait = scene.find(".wait.checked");
  wait = checked_wait.find(".val")[0].innerHTML;
  checked_positions = scene.find(".layer .checked .position");
  val = [duration / 200 - 1];
  for (_i = 0, _len = checked_positions.length; _i < _len; _i++) {
    c_p = checked_positions[_i];
    append_value(val, c_p);
  }
  post_url = make_url(BASE_URL, val);
  $.post(post_url);
  if (i > scenes.length - 2) {
    i = 0;
  } else {
    i++;
  }
  console.log(wait * 1 + duration * 1 + YOSHINA);
  return timers.push(setTimeout(function() {
    return post_positions(i);
  }, wait * 1 + duration * 1 + YOSHINA));
};

append_value = function(array, position) {
  return array.push($(position).attr("value"));
};

make_url = function(base_url, vals) {
  var url, url_0, url_1, url_2, url_3, url_4;
  url = base_url + vals[0] + ":";
  url_0 = "0-0a" + calc_id(0, vals[1], 0) + "," + "0-1a" + calc_id(0, vals[1], 1) + "," + "0-2a" + calc_id(0, vals[1], 2) + ",";
  url_1 = "1-0a" + calc_id(1, vals[2], 0) + "," + "1-1a" + calc_id(1, vals[2], 1) + "," + "1-2a" + calc_id(1, vals[2], 2) + ",";
  url_2 = "2-0a" + calc_id(2, vals[3], 0) + "," + "2-1a" + calc_id(2, vals[3], 1) + "," + "2-2a" + calc_id(2, vals[3], 2) + ",";
  url_3 = "3-0a" + calc_id(3, vals[4], 0) + "," + "3-1a" + calc_id(3, vals[4], 1) + "," + "3-2a" + calc_id(3, vals[4], 2) + ",";
  url_4 = "4-0a" + calc_id(4, vals[5], 0) + "," + "4-1a" + calc_id(4, vals[5], 1) + "," + "4-2a" + calc_id(4, vals[5], 2);
  url = url + url_0 + url_1 + url_2 + url_3 + url_4;
  console.log(url);
  return url;
};

calc_id = function(servo_index, val, servo_number) {
  console.log(json_data[servo_ids[servo_index]].positions[val][servo_number] + "");
  return json_data[servo_ids[servo_index]].positions[val][servo_number] + "";
};

init = function(base_url) {
  var post_url;
  post_url = make_init_url(base_url);
  return $.post(post_url);
};

make_init_url = function(base_url) {
  var url, url_0, url_1, url_2, url_3, url_4;
  url = base_url + "9:";
  url_0 = "0-0a" + init_params(0) + "," + "0-1a" + init_params(0) + "," + "0-2a" + init_params(0) + ",";
  url_1 = "1-0a" + init_params(1) + "," + "1-1a" + init_params(1) + "," + "1-2a" + init_params(1) + ",";
  url_2 = "2-0a" + init_params(2) + "," + "2-1a" + init_params(2) + "," + "2-2a" + init_params(2) + ",";
  url_3 = "3-0a" + init_params(3) + "," + "3-1a" + init_params(3) + "," + "3-2a" + init_params(3) + ",";
  url_4 = "4-0a" + init_params(4) + "," + "4-1a" + init_params(4) + "," + "4-2a" + init_params(4);
  url = url + url_0 + url_1 + url_2 + url_3 + url_4;
  console.log(url);
  return url;
};

init_params = function(servo_index) {
  var text;
  text = json_data[servo_index].initial_params[0] + "b" + json_data[servo_index].initial_params[1];
  return text;
};
