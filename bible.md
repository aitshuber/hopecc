---
layout: default
title:
description:
keywords:
permalink: /bible
---
<div class="uk-container uk-container-xsmall uk-margin-medium-bottom uk-margin-large-top">
	<div class="uk-text-lead uk-margin-medium-bottom">
	<h1>Bible</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	<hr/>
	<h5>Old Testament </h5>
	<div class="uk-grid-small uk-flex uk-flex-left@l">
	{% assign sorted_items = site.bible | sort: 'weight' %}
	{% for item in sorted_items %}
	{% if item.type == 'Old Testament' %}
	<div>
		<a href="{{item.url}}"><img src="{{item.image_thumb}}" class=""/></a>
	</div>
	{% endif %}
	{% endfor %}
	</div>
	<hr/>
	<h5>New Testament </h5>
	<div class="uk-grid-small uk-flex uk-flex-left@l">
	{% assign sorted_items = site.bible | sort: 'weight' %}
	{% for item in sorted_items %}
	{% if item.type == 'New Testament' %}
	<div>
		<a href="{{item.url}}"><img src="{{item.image_thumb}}" class=""/></a>
	</div>
	{% endif %}
	{% endfor %}
	</div>
	<hr/>
	<h5>Deuterocanon </h5>
	<div class="uk-grid-small uk-flex uk-flex-left@l">
	{% assign sorted_items = site.bible | sort: 'weight' %}
	{% for item in sorted_items %}
	{% if item.type == 'Deuterocanonical' %}
	<div>
		<a href="{{item.url}}"><img src="{{item.image_thumb}}" class=""/></a>
    </div>
	{% endif %}
	{% endfor %}
	</div>
	</div>
</div>
