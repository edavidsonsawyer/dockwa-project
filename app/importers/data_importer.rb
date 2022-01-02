# A very basic importer to read txt files into the database. Could be used in conjunction with an object that 
# fetches data files from an external server. If these files were to grow significantly this could be threaded 
# but that level of premature optimization is a bit much here.
class DataImporter
  def import_delimeted_files(path_to_file, delimiter)
    File.foreach(path_to_file) do |line|
      first_name, last_name, email, vehicle_type, vehicle_name, raw_vehicle_length = line.split(delimiter)
      customer = Customer.where(email: email).first_or_create!({first_name: first_name, last_name: last_name, email: email})
      Vehicle.create!({vehicle_type: vehicle_type, name: vehicle_name, length: normalize_vehicle_length(raw_vehicle_length), customer:customer})
    end
  end
  
  private
  # Vehicle lengths appear in import files as either "10 ft" or "10'. For now we'll assume this value is always given in feet"
  def normalize_vehicle_length(raw_vehicle_length)
    raw_vehicle_length.delete('^0-9')
  end
end