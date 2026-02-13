param()

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$buildDir = Join-Path $projectRoot "build"

if (Test-Path $buildDir) {
    Remove-Item -Path $buildDir -Recurse -Force
}

New-Item -Path $buildDir -ItemType Directory | Out-Null

$rootFiles = @(
    "index.html",
    "styles.css",
    "main.js",
    "script.js",
    "README.md",
    "LICENSE"
)

foreach ($file in $rootFiles) {
    $source = Join-Path $projectRoot $file
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination $buildDir -Force
    }
}

$photosDir = Join-Path $projectRoot "photos"
if (Test-Path $photosDir) {
    Copy-Item -Path $photosDir -Destination (Join-Path $buildDir "photos") -Recurse -Force
}

Set-Content -Path (Join-Path $buildDir ".nojekyll") -Value ""

Write-Host "Build complete: $buildDir"
