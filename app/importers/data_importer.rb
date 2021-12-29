# A very basic importer to read txt files into the database. Could be used in conjunction with an object that 
# fetches data files from an external server. If these files were to grow significantly this could be threaded 
# but that level of premature optimization is a bit much here.
class DataImporter

  def initialize(options = {})
    @commas_file_path = options.fetch(:commas_file_path, "#{Rails.root}/tmp/commas.txt")
    @pipes_file_path = options.fetch(:pipes_file_path, "#{Rails.root}/tmp/pipes.txt")
  end
  
  # convenience method to call in the controller. In an application we expect to keep up this would be handled in separate
  # importer tasks
  def import_current_data
    import_delimeted_files(@commas_file_path, ',')
    import_delimeted_files(@pipes_file_path, '|')
  end

  def import_delimeted_files(path_to_file, delimiter)
    File.foreach(path_to_file) do |line|
      first_name, last_name, email, vehicle_type, vehicle_name, raw_vehicle_length = line.split(delimiter)
      customer = Customer.create!({first_name: first_name, last_name: last_name, email: email})
      Vehicle.create!({vehicle_type: vehicle_type, name: vehicle_name, length: normalize_vehicle_length(raw_vehicle_length), customer:customer})
    end
  end
  
  private
  # Vehicle lengths appear in import files as either "10 ft" or "10'. For now we'll assume this value is always given in feet"
  def normalize_vehicle_length(raw_vehicle_length)
    raw_vehicle_length.delete('^0-9')
  end
end