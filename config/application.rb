require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DockwaProject
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Loads data from the given text files. Only when the server boots or it will cause problems
    # running migrations
    if defined?(Rails::Server)
      if Rails.env.development?
        config.after_initialize do
          Rails.application.load_tasks
          Rake::Task['import_data:import'].invoke
        end
      end
    end
  end
end
