---
layout: full
---
{% include section-ad.html image="hope_website_image.png" alt="Hope.png" width="" blank="true" %}

{% include section-latest.html title="Our Favorites" limit="6" more="More Articles" %}

{% assign footer_text = "" %}
{% for item in site.data.footer %}
{% assign footer_text = footer_text | append: item.footer-text | append: " " %}
{% endfor %}

{% include section-mailchimp.html title="Deepen Your Practice" text=footer_text button_text="Support Us" %}