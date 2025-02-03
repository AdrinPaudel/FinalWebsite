{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # Python with selected packages
    (python3.withPackages (ps: with ps; [
      # Core scientific computing stack
      numpy
      scipy
      pandas
      joblib
      
      # Data visualization
      matplotlib
      seaborn
      
      # Jupyter and interactive computing
      jupyter
      ipython
      
      # Optional: Machine learning and advanced scientific computing
      scikit-learn
      
      # Development and testing tools
      pytest
      black
      mypy
      
      # Optional: Additional useful libraries
      requests
    ]))

    # Development tools
    git
    cookiecutter
    direnv
    
    # Compiler and build tools
    gcc
    gnumake
    
    # Optional: Additional system-level dependencies that might be useful
    pkg-config
    libffi
  ];

  # Shell hook to set up environment
  shellHook = ''
    echo "🐍 Python NumPy Development Environment"
    echo "Python version: $(python --version)"
    echo "NumPy version: $(python -c 'import numpy; print(numpy.__version__)')"
    
    # Optional: Create and activate a virtual environment
    # python -m venv .venv
    # source .venv/bin/activate
  '';
}
