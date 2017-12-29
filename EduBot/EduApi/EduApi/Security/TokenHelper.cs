using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace EduApi.Security
{
    public static class TokenHelper
    {
        public static int? GetUserId(IIdentity identity)
        {
            return getClaim((ClaimsIdentity)identity, "userId");
        }

        private static int? getClaim(ClaimsIdentity identity, string claimType)
        {
            ClaimsIdentity claimsIdentity = (ClaimsIdentity)identity;
            IEnumerable<Claim> claims = claimsIdentity.Claims;
            var claim = claims.Where(x => x.Type == claimType).FirstOrDefault();

            return claim != null ? int.Parse(claim.Value) : (int?)null;
        }
    }
}