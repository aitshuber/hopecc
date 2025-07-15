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
	<p>Embark on a transformative journey through Scripture with Scroll & Voice, the captivating audio Bible. Discover the rich narratives and enduring wisdom of the Old and New Testaments, from Genesis to Revelation, brought vividly to life through skilled narration. Enrich your understanding of the faith with the complete Deuterocanon, including Tobit, Judith, Wisdom, Sirach, Baruch, and more. Listen here or wherever you enjoy podcasts.</p>
	<hr/>
	<h2>Old Testament </h2>
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
	<h2>New Testament </h2>
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
    <h2>Deuterocanon</h2>
	<div class="uk-grid-small uk-child-width-1-3@s uk-child-width-1-3@m uk-child-width-1-3@l uk-grid-match" uk-grid>
	{% assign sorted_items = site.bible | sort: 'weight' %}
	{% for item in sorted_items %}
	{% if item.type == 'Other' %}
	<div>
		<a href="{{item.url}}" class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-center uk-flex-middle" style="min-height: 249.39px">{% if item.image_thumb %}<img src="{{item.image_thumb}}" class="uk-card-media-top">{% else %}<h3 class="uk-card-title uk-text-center uk-text-middle">{{ item.book }}</h3>{% endif %}</a>
	</div>
	{% endif %}
	{% endfor %}
	</div>
	</div>
</div>
