param(
    [ValidateSet("Start", "Stop", "Restart")]
    [string]$Action = "Start",
    [int]$Port = 8000
)

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$previewUrl = "http://127.0.0.1:$Port"

function Get-PreviewProcessIds {
    param([int]$LookupPort)

    $connections = Get-NetTCPConnection -LocalPort $LookupPort -State Listen -ErrorAction SilentlyContinue
    if (-not $connections) {
        return @()
    }

    return $connections | Select-Object -ExpandProperty OwningProcess -Unique
}

function Stop-Preview {
    param([int]$StopPort)

    $pids = Get-PreviewProcessIds -LookupPort $StopPort
    if (-not $pids.Count) {
        Write-Host "No preview server was listening on port $StopPort."
        return
    }

    foreach ($procId in $pids) {
        try {
            Stop-Process -Id $procId -Force -ErrorAction Stop
            Write-Host "Stopped preview process $procId on port $StopPort."
        } catch {
            Write-Host "Failed to stop process ${procId}: $($_.Exception.Message)"
        }
    }
}

function Start-Preview {
    param(
        [int]$StartPort,
        [string]$WorkingDir
    )

    $existing = Get-PreviewProcessIds -LookupPort $StartPort
    if ($existing.Count) {
        Write-Host "Preview server already running on port $StartPort (PID(s): $($existing -join ', '))."
        Write-Host "URL: http://127.0.0.1:$StartPort/index.html"
        return
    }

    Start-Process -FilePath "python" -ArgumentList @("-m", "http.server", "$StartPort", "--bind", "127.0.0.1") -WorkingDirectory $WorkingDir

    Start-Sleep -Milliseconds 300

    try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:$StartPort" -UseBasicParsing -TimeoutSec 5
        Write-Host "Preview started ($($response.StatusCode)) at http://127.0.0.1:$StartPort/index.html"
    } catch {
        Write-Host "Preview start command was issued, but health check failed for http://127.0.0.1:$StartPort."
    }
}

switch ($Action) {
    "Start" {
        Start-Preview -StartPort $Port -WorkingDir $projectRoot
    }
    "Stop" {
        Stop-Preview -StopPort $Port
    }
    "Restart" {
        Stop-Preview -StopPort $Port
        Start-Preview -StartPort $Port -WorkingDir $projectRoot
    }
}
