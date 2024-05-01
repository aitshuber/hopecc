module Jekyll
  class BibleContentPage < Page
	def initialize(site, base, dir, name, book_data)
	  @site = site
	  @base = base
	  @dir = dir
	  @name = name
	  self.process(name)
	  self.content = "{{ content }}"
	  self.data = {
		'layout' => 'bible',  # Your specific layout for the book/chapter/verse pages
		'title' => "#{book_data['book']} #{book_data['chapters'][0]['chapter']}",  # Example title setup
		'book' => book_data['book'],
		'chapters' => book_data['chapters']
	  }
	end
  end

  class BibleContentGenerator < Generator
	safe true
	priority :low

	def generate(site)
	  site.collections['bible'].docs.each do |doc|
		book_data = doc.data
		book_slug = Jekyll::Utils.slugify(book_data['book'])

		# Generate book page
		site.pages << BibleContentPage.new(site, site.source, book_slug, 'index.html', book_data)

		book_data['chapters'].each_with_index do |chapter, index|
		  chapter_data = {
			'book' => book_data['book'],
			'chapters' => [chapter]  # Wrap this chapter in an array for template compatibility
		  }
		  chapter_slug = "#{book_slug}/#{index + 1}"

		  # Generate chapter page
		  site.pages << BibleContentPage.new(site, site.source, chapter_slug, 'index.html', chapter_data)

		  chapter['verses'].each_with_index do |verse, v_index|
			verse_data = {
			  'book' => book_data['book'],
			  'chapters' => [{
				'chapter' => chapter['chapter'],
				'verses' => [verse]  # Only this verse
			  }]
			}
			verse_slug = "#{chapter_slug}/#{v_index + 1}"

			# Generate verse page
			site.pages << BibleContentPage.new(site, site.source, verse_slug, 'index.html', verse_data)
		  end
		end
	  end
	end
  end
end
