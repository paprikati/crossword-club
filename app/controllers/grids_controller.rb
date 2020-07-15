class GridsController < ApplicationController
  def create
    attrs = params.require(:grids).permit(:layout)

    puts attrs

    grid = Grid.create!(attrs)

    render json: {grids: grid}

  end
end
