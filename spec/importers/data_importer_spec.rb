require 'rails_helper'

RSpec.describe DataImporter do
  describe 'import happy path' do
    it 'imports pipe files' do
      importer = DataImporter.new
      importer.import_delimeted_files("#{Rails.root}/spec/importers/fixtures/pipes_fixture.txt", "|")
      expect(Customer.all.size).to eq 2
    end

    it 'imports comma files' do
      importer = DataImporter.new
      importer.import_delimeted_files("#{Rails.root}/spec/importers/fixtures/commas_fixture.txt", ",")
      expect(Customer.all.size).to eq 2
    end

  end
end