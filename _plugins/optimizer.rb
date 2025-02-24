require 'json'
require 'digest'

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
        'layout' => 'bible',
        'title' => "#{book_data['book']} #{book_data['chapters'][0]['chapter']}",
        'book' => book_data['book'],
        'chapters' => book_data['chapters']
      }
    end
  end

  class BibleContentGenerator < Generator
    safe true
    priority :low

    CACHE_FILE = "_cache/bible_cache.json"

    def generate(site)
      # Ensure cache directory exists
      FileUtils.mkdir_p("_cache")

      # Load existing cache
      cached_data = load_cache

      # Get the current Bible collection data
      bible_data = site.collections['bible'].docs.map(&:data)

      # Generate hash of current Bible data for comparison
      current_hash = Digest::MD5.hexdigest(JSON.dump(bible_data))

      # Skip regeneration if cache matches
      if cached_data && cached_data["hash"] == current_hash
        Jekyll.logger.info "Bible Plugin:", "Using cached pages."
        return
      end

      Jekyll.logger.info "Bible Plugin:", "Generating Bible pages..."

      # Store book data for caching
      new_cache = { "hash" => current_hash, "books" => [] }

      bible_data.each do |book_data|
        book_slug = Jekyll::Utils.slugify(book_data['book'])

        # Generate book page
        site.pages << BibleContentPage.new(site, site.source, book_slug, 'index.html', book_data)

        book_data['chapters'].each_with_index do |chapter, index|
          chapter_slug = "#{book_slug}/#{index + 1}"
          chapter_data = { 'book' => book_data['book'], 'chapters' => [chapter] }

          # Generate chapter page
          site.pages << BibleContentPage.new(site, site.source, chapter_slug, 'index.html', chapter_data)
        end

        # Save processed books to cache
        new_cache["books"] << book_data
      end

      # Save cache file
      save_cache(new_cache)
    end

    private

    def load_cache
      return nil unless File.exist?(CACHE_FILE)
      JSON.parse(File.read(CACHE_FILE))
    rescue JSON::ParserError
      nil
    end

    def save_cache(data)
      File.open(CACHE_FILE, "w") { |f| f.write(JSON.pretty_generate(data)) }
    end
  end
end
