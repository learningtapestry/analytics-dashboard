# frozen_string_literal: true

class BaseInteractor
  attr_reader :error

  def self.call(params)
    interactor = new(params)
    interactor.call
    interactor
  end

  def initialize(params)
    @params = params
  end

  def call
    raise NotImplementedError
  end

  def success?
    @error.nil?
  end
end
