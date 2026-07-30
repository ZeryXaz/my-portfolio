# Native PowerShell HTTP Static Server for Portfolio Preview
param([int]$Port = 8080)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "====================================================" -ForegroundColor Green
    Write-Host "🚀 Local Server running at: $prefix" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C in terminal to stop the server." -ForegroundColor Yellow
    Write-Host "====================================================" -ForegroundColor Green

    $rootPath = Resolve-Path $PSScriptRoot

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($relPath)) {
            $relPath = "index.html"
        }

        $fullPath = [System.IO.Path]::Combine($rootPath, $relPath)

        if (-not (Test-Path $fullPath -PathType Leaf)) {
            $response.StatusCode = 404
            $errBuf = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $relPath")
            $response.ContentLength64 = $errBuf.Length
            $response.OutputStream.Write($errBuf, 0, $errBuf.Length)
            $response.OutputStream.Close()
            continue
        }

        $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
        $contentType = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".json" { "application/json; charset=utf-8" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".ico"  { "image/x-icon" }
            ".pdf"  { "application/pdf" }
            ".xml"  { "application/xml" }
            ".webmanifest" { "application/manifest+json" }
            default { "application/octet-stream" }
        }

        $response.ContentType = $contentType
        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Error starting server: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
}
