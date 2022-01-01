namespace :import_data do
  desc 'Imports comma and pipe data'
  puts "here"
  task import: :environment do
    importer = DataImporter.new
    puts "I'm here"
    importer.import_delimeted_files("#{Rails.root}/tmp/commas.txt", ",")
    importer.import_delimeted_files("#{Rails.root}/tmp/pipes.txt", "|")
    puts "now I'm here"
  end
end