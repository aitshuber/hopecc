---
layout: full
---
{% include section-ad.html image="hero-image-placeholder.jpg" alt="Hope.png" width="" blank="true" %}

{% include section-latest.html title="Our Favorites" limit="6" more="More Articles" %}

{% assign footer_text = "" %}
{% for item in site.data.footer %}
{% assign footer_text = footer_text | append: item.footer-text | append: " " %}
{% endfor %}

{% include section-mailchimp.html title="Newsletter Signup" text=footer_text button_text="Support Us" %}