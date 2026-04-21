import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { ARAB_COUNTRIES } from "./ArabHubData";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface ArabMapInteractiveProps {
  onCountryHover: (id: string | null) => void;
  onCountryClick: (id: string) => void;
  activeCountryId: string | null;
}

export function ArabMapInteractive({
  onCountryHover,
  onCountryClick,
  activeCountryId,
}: ArabMapInteractiveProps) {
  
  // List of country names to match the topojson
  const arabCountryNames = Object.keys(ARAB_COUNTRIES);

  return (
    <div className="w-full h-[500px] md:h-[700px] relative bg-transparent overflow-hidden rounded-lg border-4 border-black/20">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 600, // Zoom level adjusted for MENA
          center: [28, 24] // Center point [Longitude, Latitude] approx over Egypt/Red Sea
        }}
        className="w-full h-full outline-none"
        width={800}
        height={600}
      >
        {/* SVG Definitions for Flags and Glow */}
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ccff00" floodOpacity="1" />
            <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#ccff00" floodOpacity="0.5" />
          </filter>
          <filter id="neon-glow-active" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#b084ff" floodOpacity="1" />
            <feDropShadow dx="0" dy="0" stdDeviation="25" floodColor="#b084ff" floodOpacity="0.8" />
          </filter>

          {Object.values(ARAB_COUNTRIES).map((country) => (
            <pattern
              key={`flag-pattern-${country.id}`}
              id={`flag-${country.id}`}
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href={country.flagUrl}
                x="0"
                y="0"
                width="1"
                height="1"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          ))}
        </defs>

        <ZoomableGroup 
           center={[28, 24]} 
           zoom={1} 
           minZoom={1} 
           maxZoom={4} 
           translateExtent={[[-400, -400], [1200, 1000]]} // prevent panning too far out
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoName = geo.properties.name as string;
                // Check if this country is in our Arab League config
                const isArabCountry = arabCountryNames.includes(geoName);
                
                if (!isArabCountry) return null; // We only render Arab countries!

                const countryData = ARAB_COUNTRIES[geoName];
                const isActive = activeCountryId === countryData.id;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => onCountryHover(countryData.id)}
                    onMouseLeave={() => onCountryHover(null)}
                    onClick={() => onCountryClick(countryData.id)}
                    className="outline-none transition-all duration-300 origin-center cursor-pointer"
                    style={{
                      default: {
                        fill: `url(#flag-${countryData.id})`,
                        mixBlendMode: "luminosity", // Make it slightly muted when not hovered
                        opacity: isActive ? 1 : 0.5,
                        stroke: "#000",
                        strokeWidth: 1,
                        filter: isActive ? "url(#neon-glow-active)" : "none",
                      },
                      hover: {
                        fill: `url(#flag-${countryData.id})`,
                        mixBlendMode: "normal",
                        opacity: 1,
                        stroke: "#ccff00",
                        strokeWidth: 2,
                        filter: "url(#neon-glow)",
                        outline: "none",
                        transformOrigin: "center",
                      },
                      pressed: {
                        fill: `url(#flag-${countryData.id})`,
                        opacity: 1,
                        stroke: "#b084ff",
                        strokeWidth: 3,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
