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
	<div class="uk-container uk-margin-large-top uk-margin-large-bottom">
    <div class="uk-grid-small uk-child-width-1-3@s uk-child-width-1-3@m uk-child-width-1-3@l uk-grid-match" uk-grid>
	{% assign sorted_items = site.bible | sort: 'weight' %}
	{% for item in sorted_items %}
	{% if item.type == 'Old Testament' %}
	<div>
		<a href="{{item.url}}" class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-center uk-flex-middle" style="min-height: 249.39px">{% if item.image_thumb %}<img src="{{item.image_thumb}}" class="uk-card-media-top">{% else %}<h3 class="uk-card-title uk-text-center uk-text-middle">{{ item.book }}</h3>{% endif %}</a>
	</div>
	{% endif %}
	{% endfor %}
	</div>
	<hr/>
	<h5>New Testament </h5>
	<div class="uk-grid-small uk-child-width-1-3@s uk-child-width-1-3@m uk-child-width-1-3@l uk-grid-match" uk-grid>
	{% assign sorted_items = site.bible | sort: 'weight' %}
	{% for item in sorted_items %}
	{% if item.type == 'New Testament' %}
	<div>
		<a href="{{item.url}}" class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-center uk-flex-middle" style="min-height: 249.39px">{% if item.image_thumb %}<img src="{{item.image_thumb}}" class="uk-card-media-top">{% else %}<h3 class="uk-card-title uk-text-center uk-text-middle">{{ item.book }}</h3>{% endif %}</a>
	</div>
	{% endif %}
	{% endfor %}
	</div>
	</div>
</div>
