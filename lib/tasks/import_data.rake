namespace :import_data do
  desc 'Imports comma and pipe data'
  task import: :environment do
    importer = DataImporter.new
    importer.import_delimeted_files("#{Rails.root}/tmp/commas.txt", ",")
    importer.import_delimeted_files("#{Rails.root}/tmp/pipes.txt", "|")
  end
end